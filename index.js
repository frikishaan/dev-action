const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const url = "https://dev.to/api";

// Get DEV secret token
const secret = core.getInput("dev-to-secret");
var tagsString = core.getInput("tags");

// Getting tags
var tags = tagsString.split(",");

// Get the JSON webhook payload for the event that triggered the workflow
const payload = github.context.payload;

if (payload.action == "published") {
  try {
    // Prepare data
    const data = JSON.stringify({
      article: {
        title: payload.release.name,
        published: false,
        body_markdown: payload.release.body,
        tags: tags,
      },
    });

    // Creating POST request to DEV.to API
    axios
      .post(`${url}/articles`, data, {
        headers: {
          "Content-Type": "application/json",
          "api-key": secret,
        },
      })
      .then((data) =>
        console.log(`Post has been published here is the URL - ${data.url}`)
      )
      .catch((err) => core.setFailed(err));

    const time = new Date().toTimeString();
    core.setOutput("time", time);

    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
} else {
  // Set failed
  core.setFailed("The workflow can only be triggered on release event");
}
