import React from "react";

import "./App.css";
import Logo from "./assets/shrOOm-logo.png";

import CreateMeeting from "./components/CreateMeeting";
import MeetingList from "./components/MeetingList";

declare var ZoomMtg;

// declare var ZoomMtg;

// ZoomMtg.setZoomJSLib("https://source.zoom.us/2.1.1/lib", "/av");

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();
// // loads language files, also passes any error messages to the ui
// ZoomMtg.i18n.load("en-US");
// ZoomMtg.i18n.reload("en-US");

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
}

function Sidebar() {
  return (
      <div className={"sidebar"} id={"sidebar"}>
        <button className={"close-button"} onClick={closeSidebar}>Close</button>
        <p>SHROOM is an online space created with the ZOOM api for students to study, collaborate, and socialize
          inspired by the Gordon Shrum Lounge in the commons block of the first year residence Place Vanier, at UBC.
        </p>
      </div>
  )
}

function App() {
  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  // const signatureEndpoint = "http://localhost:4000";
  // const apiKey = "ylFH2WzbRXGkySuFN9Cnqg";
  // const role = 1;
  // const leaveUrl = "http://localhost:3000"; // + ?meetingId=<meetingId>
  // const userName = "React";
  // const userEmail = "";
  // const meetingIdEndpoint = "http://localhost:4321/meeting";

  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  // var registrantToken = "";

  // function getMeetingId(e) {
  //   e.preventDefault();

  //   fetch(meetingIdEndpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log("hello");
  //       getSignature(response.id, response.password);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // function getSignature(meetingId, password) {
  //   fetch(signatureEndpoint, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       meetingNumber: meetingId,
  //       role: role,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       startMeeting(response.signature, meetingId, password);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // function startMeeting(signature, meetingId, password) {
  //   document.getElementById("zmmtg-root").style.display = "block";

  //   ZoomMtg.init({
  //     leaveUrl: leaveUrl,
  //     success: (success) => {
  //       console.log(success);

  //       ZoomMtg.join({
  //         signature: signature,
  //         meetingNumber: meetingId,
  //         userName: userName,
  //         apiKey: apiKey,
  //         userEmail: userEmail,
  //         passWord: password,
  //         tk: registrantToken,
  //         success: (success) => {
  //           console.log(success);
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  return (
    <div className="App">
      <header className={"header"}>
        <img className={"header-image"} src={Logo} alt={"SHROOM logo"} />
        <div className={"header-text"}>
          <h1 className={"app-title"}>SHROOM</h1>
          <h4>Virtual Study Space</h4>
        </div>
        <nav className={"nav"}>
          <button className={"about-button"} onClick={openSidebar}>ABOUT</button>
        </nav>
      </header>

      <main id={"main"}>
        <h1>Study Rooms</h1>
        {/* <CreateMeeting /> */}
        <MeetingList />
      </main>

        <Sidebar />

      <footer className={"foot"}>
        Created by Katharine, Elizabeth & Bikram
      </footer>
    </div>
  );
}

export default App;
