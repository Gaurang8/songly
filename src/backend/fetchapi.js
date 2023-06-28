
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
    console.error(error);
  }
};

const getApiData = async (token, url) => {
  try {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const responseData = await result.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export { fetchToken, getApiData };
