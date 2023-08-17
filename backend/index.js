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
  res.header("Access-Control-Allow-Origin", process.env.BASE_ADDR);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE ,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send(`${process.env.BASE_ADDR}`);
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
      playlists: [{ name: "default", songs: [] }],
    });

    await newUser.save().then(() => {
      console.log("user save");
    });
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.TOKEN_KEY
    );

    console.log("token is", token);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    res.cookie("token", token, { expires: expirationDate, sameSite: "None", secure: true });

    newUser.token = token;
    console.log(newUser);
    res.status(201).json({ user: newUser, message: "register successfully" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
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
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      res.cookie("token", token, { expires: expirationDate, sameSite: "None", secure: true });


      return res.status(200).json({ message: "Login successful", user });
    }
    return res.status(400).send("Invalid data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

app.get("/auth", authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.status(201).json({ user });
});


app.patch('/api/createPlaylist/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { playlistName } = req.body;

    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.playlists.push({
      name: playlistName, songs: [], totalsong: 11, privacy: "public", Description: "this is descriptionb"
    });
    await user.save();

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this endpoint after the existing routes

app.put('/api/addtofav/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { song } = req.body; // Assuming song is a JSON object representing the song

    console.log(song);
    const user = await User.findById(userId);

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's favorites with the new song
    user.playlists[1].songs.push(song);

    const updatedUser = await user.save();
    console.log(updatedUser);

    res.status(200).json({ message: 'Song added to favorites', user: updatedUser });
  } catch (error) {
    console.error('Error adding song to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(5001);
