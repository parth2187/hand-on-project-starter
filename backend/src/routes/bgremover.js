const router = require("express").Router();
const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const FormData = require("form-data");

const fileupload = require("express-fileupload");
app.use(fileupload());

app.use(bodyParser.json());

module.exports = app;

app.post("/upload", (req, res) => {
  const formData = new FormData();
  formData.append("size", "auto");
  const img =
    "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";
  formData.append("image_file_b64", img);

  axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": process.env.BGREMOVER_API_KEY,
      Accept: "application/json",
    },
    encoding: null,
  })
    .then((response) => {
      if (response.status != 200)
        return console.error("Error:", response.status, response.statusText);
      res.json(response.data);
    })
    .catch((error) => {
      return console.error("Request failed:", error);
    });
});

module.exports = router;
