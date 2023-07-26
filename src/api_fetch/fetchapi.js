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
  const response = await fetch("http://localhost:5001/auth", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (response.ok) {
    console.log(result.user);
    let _result = result.user;
    return _result;
  } else {
    return false;
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

export { fetchToken, getApiData, authUser ,handleSearchsong };
