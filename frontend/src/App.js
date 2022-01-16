import React from "react";

import "./App.css";

declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.1.1/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function App() {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = "http://localhost:4000";
  var apiKey = "ylFH2WzbRXGkySuFN9Cnqg";
  var meetingNumber = "71886084944";
  var role = 1;
  var leaveUrl = "http://localhost:3000"; // + ?meetingId=<meetingId>
  var userName = "React";
  var userEmail = "";
  var passWord = "5njy5f";
  const meetingIdEndpoint = "https://api.zoom.us/v2/users/me/meetings";
  const JWTToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InlsRkgyV3piUlhHa3lTdUZOOUNucWciLCJleHAiOjE2NDI4NzcyOTYsImlhdCI6MTY0MjI3MjQ5Nn0.GhI_rDwAEpUckV006m49s6Z-5oDg5EecmCcDVOpTORs";
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = "";

  function getMeetingId(e) {
    e.preventDefault();

    fetch(meetingIdEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWTToken}`,
      },
      body: {
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
      },
    })
      .then((res) => res.json())
      .then((response) => {
        getSignature(response.id, response.password);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getSignature(meetingId, password) {
    // e.preventDefault();

    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingId,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature, password);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature, meetingId, password) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingId,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: password,
          tk: registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getMeetingId}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
