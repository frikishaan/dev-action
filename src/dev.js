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

    core.info("Post has been published ✅");
    core.setOutput("url", res.data.url);
  } catch (e) {
    core.setFailed("An error has been occured " + e);
  }
}

module.exports = createPost;
