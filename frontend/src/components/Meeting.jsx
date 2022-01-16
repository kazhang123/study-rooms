import { useEffect, useState } from "react";

function Meeting(props) {
  const [meetingId, setMeetingId] = useState(null);

  useEffect(() => {
    setMeetingId(props.meetingId);
  }, [meetingId]);

  return (
    <div>
      <div>Title</div>
      <div>Subtitle</div>
      <div>#Participants</div>
      <button>Join Buttom</button>
    </div>
  );
}

export default Meeting;
