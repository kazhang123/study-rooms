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
  const signatureEndpoint = "http://localhost:4000";
  const apiKey = "ylFH2WzbRXGkySuFN9Cnqg";
  const role = 1;
  const leaveUrl = "http://localhost:3000"; // + ?meetingId=<meetingId>
  const userName = "React";
  const userEmail = "";
  const meetingIdEndpoint = "http://localhost:4321/meeting";

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
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("hello");
        getSignature(response.id, response.password);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getSignature(meetingId, password) {
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
        startMeeting(response.signature, meetingId, password);
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
