const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const secret = core.getInput("dev-to-secret");

try {
  const data = JSON.stringify({
    article: {
      title: "New test title",
      published: false,
      body_markdown: "## Hello #### Hello This is a test post.",
      tags: ["javascript", "python"],
    },
  });

  axios
    .post("https://dev.to/api/articles", data, {
      headers: {
        "Content-Type": "application/json",
        "api-key": secret,
      },
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput("who-to-greet");
  // console.log(`Hello ${nameToGreet}!`);

  const time = new Date().toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
