const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


dotenv.config();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://sonngly.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("Database connected successfully!");
  } else {
    res.send("Database connection failed.");
  }
});

const url = `${process.env.MONGODB_URI}Song?retryWrites=true&w=majority`;

console.log(url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((error) => {
    console.log("error regarding to database: ", error);
  });

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token === null) {
    return res.status(401).json({ message: "Missing token" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist , login to continue");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    await newUser.save().then(() => {
      console.log("user save");
    });
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY
    );

    console.log("token is", token);

    await res.cookie("token", token);

    newUser.token = token;
    console.log(newUser);
    res.status(201).json({ user: newUser, message: "register successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login" ,async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );

      console.log("token is", token);
      res.cookie("token", token);

  
      return res.status(200).json({ message: "Login successful", user });
    }
    return res.status(400).send("Invalid data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/auth", authenticateToken, async (req, res) => {
  const user = await User.findOne({email : req.user.email});
  res.status(201).json({user});
});

app.listen(5001);
