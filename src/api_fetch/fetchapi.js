const client = "62b91c8cfc9f4a329c60ff1966be9d3d";
const secret = "a45d808d3dc24ab29859cc509c4edb2b";

const fetchToken = async () => {
  let options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: client,
      client_secret: secret,
      audience: "YOUR_API_IDENTIFIER",
    }),
  };

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      options
    );
    const responseData = await response.json();
    const accessToken = responseData.access_token;
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

const getApiData = async (url) => {
  const token = await fetchToken();

  try {
    if (token) {
      const result = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const responseData = await result.json();
      return responseData;
    } else {
      console.log("token not fetch");
    }
  } catch (error) {
    console.log(error);
  }
};

const authUser = async () => {
  console.log("auth checking");
  const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/auth`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (response.ok) {
    console.log("user is ", result.user);
    let _result = result.user;
    return _result;
  } else {
    console.log("error while feaching user")
    return false;
  }
};

const handleLogout = async () => {
  console.log("logout");
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/logout`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log("logout successfully");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error while log out", error);
  }
};



const handleSearchsong = async (searchValue) => {
  console.log(searchValue);
  try {
    const apiData = await getApiData(
      `https://api.spotify.com/v1/search?q=${searchValue.replace(
        / +/g,
        "+"
      )}&type=track&limit=4`
    );
    console.log('data is ', apiData);
    return apiData;
  } catch (err) {
    console.log("song cant be fetched");
    return null;
  }
};

const handleFavorite = async (songId, user) => {
  console.log("favorite");
  console.log(songId)
  console.log(user)

  try {
    if (user?.favorites?.length === 0) {
      console.log("Please create a playlist first");
    }
    else {
      if (songId && user?._id) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/api/addtofav/${user?._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ songId: songId}),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          console.log("user is iiii", updatedUser);
          return response.status , updatedUser;
        } else {
          console.error('Failed toadd song', response.status, response.statusText);
        }
      }
      else {
        console.log("Please login first");
      }
    }
  } catch (error) {
    console.error('Error adding song:', error);
  }

};

const removeFavorite = async (songId, user) => {
  console.log("favorite");
  console.log(songId)

  try {
    if (user?.favorites[0]?.songs.length === 0) {
      console.log("Empty list");
    }
    else {
      if (songId && user?._id) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/api/removefromfav/${user?._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ songId: songId }),
        });

        if (response.ok) {
          const updatedUser = await response.json();
          console.log("user is", updatedUser);
          return response.status , updatedUser;
        } else {
          console.error('Failed to remove song', response.status, response.statusText);
        }
      }
      else {
        console.log("cant get songid or userid");
      }
    }
  } catch (error) {
    console.error('Error removing song:', error);
  }
};


// const handleFavorite = async (songId, user) => {
//   console.log("favorite");
//   console.log(songId)
//   console.log(user)

//   try {
//     if (user?.favorites?.length === 0) {
//       console.log("Please create a playlist first");
//     }
//     else {
//       if (songId && user?._id) {
//         const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDR}/api/addtofav/${user?._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ songId: songId, favotId: 1 }),
//         });

//         if (response.ok) {
//           const updatedUser = await response.json();
//           console.log("user is iiii", updatedUser);
//           return response.status , updatedUser;
//         } else {
//           console.error('Failed toadd song', response.status, response.statusText);
//         }
//       }
//       else {
//         console.log("Please login first");
//       }
//     }
//   } catch (error) {
//     console.error('Error adding song:', error);
//   }

// };

export { fetchToken, getApiData, authUser, handleSearchsong, handleLogout, handleFavorite ,removeFavorite };
