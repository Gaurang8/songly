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
      playlists: [],
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
      name: playlistName, songs: [], totalsong: 0, privacy: "public", Description: "this is description" , image :null
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
    const { songId } = req.body; // Assuming song is a JSON object representing the song

    await console.log("song0",songId);

    const user = await User.findById(userId);

    console.log(user);
    console.log("song1",songId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(user.favorites[0].songs.includes(songId)){
      return res.status(410).json({ message: 'Song already in favorites' });

    }

    // Update the user's favorites with the new song
    user.favorites[0].songs.push(songId);
    user.favorites[0].totalsong = user.favorites[0].songs.length;
    const updatedUser = await user.save();

    console.log(user);
    res.status(200).json({user: updatedUser });
  } catch (error) {
    console.error('Error adding song to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//  remove fav api/removefromfav/${user?._id

app.put('/api/removefromfav/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { songId  } = req.body; 

    await console.log("songId",songId);

    const user = await User.findById(userId);

    console.log(user);
    console.log("song1",songId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if(! user.favorites[0].songs.includes(songId)){
      return res.status(410).json({ message: 'Song not in favorites' });
    }

    user.favorites[0].songs = user.favorites[0].songs.filter((song) => song !== songId);
    user.favorites[0].totalsong = user.favorites[0].songs.length;
    const updatedUser = await user.save();

    res.status(200).json({user: updatedUser });
  } catch (error) {
    console.error('Error removing song from favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.put('/api/addtoplaylist/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { songId, playlistIds } = req.body; 

    const user = await User.findById(userId);
    console.log(playlistIds)

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    for (const playlistId of playlistIds) {
      const selectedPlaylist = user.playlists.find(playlist => playlist.id === playlistId);
       console.log(selectedPlaylist)
      if (!selectedPlaylist) {
        console.error(`Playlist with ID ${playlistId} not found for user ${userId}`);
        continue; 
      }

      if (selectedPlaylist.songs.includes(songId)) {
        console.log(`Song with ID ${songId} already in playlist ${playlistId}`);
        continue; 
      }

      selectedPlaylist.songs.push(songId);
      selectedPlaylist.totalsong = selectedPlaylist.songs.length;
    }

    const updatedUser = await user.save();

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error('Error adding song to playlists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.patch('/api/editPlaylistData/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { updatedPlaylistData , playlistId} = req.body;

    const user = await User.findById(userId);
    console.log(playlistId)

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }


    const playlistIndex = user.playlists.findIndex(
      (playlist) => playlist._id.toString() === playlistId
    );

    if (playlistIndex === -1) {
      return res.status(400).json({ message: 'Playlist not found' });
    }

    user.playlists[playlistIndex].name = updatedPlaylistData.name;
    user.playlists[playlistIndex].Description = updatedPlaylistData.Description;
    user.playlists[playlistIndex].image = updatedPlaylistData.image;
    user.playlists[playlistIndex].privacy = updatedPlaylistData.privacy;


    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(5001);
