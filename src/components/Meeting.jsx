import greenCircle from "../assets/green-circle.png";
import "./styles.css";

declare var ZoomMtg;

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.1.1/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function Meeting(props) {
  // const [meetingId, setMeetingId] = useState(null);
  const signatureEndpoint = "https://zoom-sample-signature011621.herokuapp.com";
  const apiKey = "ylFH2WzbRXGkySuFN9Cnqg";
  const role = 0;
  const { serverNum, title, meetingId, password } = props;
  // const password = 249317;
  const leaveUrl = "http://localhost:3000"; // + ?meetingId=<meetingId>
  const userName = "React";
  const userEmail = Math.random();
  const meetingIdEndpoint = "http://localhost:4321/meeting";

  var registrantToken = "";

  function authenticate() {}

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

  function getSignature() {
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

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingId,
          userName: "Guest",
          apiKey: apiKey,
          //   userEmail: userEmail,
          passWord: password,
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

  // useEffect(() => {
  //   setMeetingId(props.meetingId);
  // }, [meetingId]);

  return (
    <div className="meeting">
      <div className={"card"}>
        <div className={"card-body"}>
          <div className="icon-wrapper">
            <span>
              <img src={greenCircle} className="icon" />
            </span>
            <span>
              <h5 className={"card-title"}>{`Server ${serverNum}`}</h5>
            </span>
          </div>
          <p className={"card-text"}>{title}</p>
          <button className="join-button" onClick={getSignature}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
