const createPost = require("../src/dev");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

// DEV API URL
const url = "https://dev.to/api";

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mocking 201 (created) response
mock.onPost(url + "/articles").reply(201, {});

test("Testing a 201 (created) response", () => {
  var data = {};
  expect(createPost(data, "secret")).toBeTruthy();
});

// Mocking 400 response
mock.onPost(url + "/articles").reply(400, {
  error: "bad request",
  status: 400,
});

test("Testing a 400 response", async () => {
  var data = {};
  try {
    await createPost(data, "secret");
  } catch (e) {
    expect(e).toEqual({
      error: "bad request",
      status: 400,
    });
  }
});
