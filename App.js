const express = require("express");
const axios = require("axios").default;
const app = express();
const cors = require("cors");
const port = 4321;

app.use(cors());

app.post("/meeting", (req, res) => {
  const JWTToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InlsRkgyV3piUlhHa3lTdUZOOUNucWciLCJleHAiOjE2NDI4NzcyOTYsImlhdCI6MTY0MjI3MjQ5Nn0.GhI_rDwAEpUckV006m49s6Z-5oDg5EecmCcDVOpTORs";

  let body = {
    topic: "something",
    type: 1,
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: true,
      mute_upon_entry: true,
      approval_type: 2,
      registration_type: 3,
      auto_recording: "none",
      enforce_login: false,
      enforce_login_domains: false,
    },
  };

  axios({
    method: "post",
    url: "https://api.zoom.us/v2/users/me/meetings",
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWTToken,
    },
  })
    .then((response) => {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
