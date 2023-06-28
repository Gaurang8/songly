const express = require("express");
const app = express();
const cors = require("cors");
const { Place } = require("@mui/icons-material");

const client = "62b91c8cfc9f4a329c60ff1966be9d3d";
const secret = "a45d808d3dc24ab29859cc509c4edb2b";

app.use(cors());

let data = [];
let playlistData = [];

var options = {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: client,
    client_secret: secret,
    audience: "YOUR_API_IDENTIFIER",
  }),
};

fetch("https://accounts.spotify.com/api/token", options)
  .then(function (response) {
    return response.json();
  })
  .then(function (responseData) {
    data = responseData.access_token;
    console.log(data);
    get_playlist(data);
  })
  .catch(function (error) {
    console.error(error);
  });

const get_playlist = async (accessToken) => {
  console.log(accessToken);

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?country=IN&limit=40`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const responseData = await result.json();
  playlistData = responseData;
};

app.get("/",(req,res)=>{
  res.json(playlistData.categories);
})

app.get("/playlist", (req, res) => {
  list = [];
  playlistData.categories.items.forEach((element) => {
    item = {};
    item.id = element.id;
    item.name = element.name;
    item.img = element.icons[0].url;
    list.push(item);
  });

  res.json(list);
});

const startServer = async () => {
  await get_playlist(data);
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
};

startServer();
