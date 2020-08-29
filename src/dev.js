const core = require("@actions/core");
const axios = require("axios");

const url = "https://dev.to/api";

async function createPost(data, secret) {
  try {
    const res = await axios.post(`${url}/articles`, data, {
      headers: {
        "Content-Type": "application/json",
        "api-key": secret,
      },
    });

    var data = await res.json();
    return data;
  } catch (e) {
    core.setFailed("An error has been occured " + e);
    return false;
  }
}

module.exports = createPost;
