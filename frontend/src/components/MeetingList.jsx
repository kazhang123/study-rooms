import { useState } from "react";
import Meeting from "./Meeting";
import "./styles.css";

function MeetingList() {
  const meetings = [
    {
      serverNum: 1,
      title: "Chill and chat",
      meetingId: 4086792183,
      password: 249317,
    },
    {
      serverNum: 2,
      title: "Quiet hours",
      meetingId: 3269782558,
      password: "XhFRp6",
    },
    {
      serverNum: 3,
      title: "Quiet hours",
      meetingId: 2571663852,
      password: "xSnT07",
    },
    {
      serverNum: 3,
      title: "Ambiance and music",
      meetingId: 4442116142,
      password: "544372",
    },
  ];
  return (
    <div className="meeting-list">
      {meetings.map((m) => (
        <Meeting
          key={m.serverNum}
          serverNum={m.serverNum}
          title={m.title}
          meetingId={m.meetingId}
          password={m.password}
        />
      ))}
    </div>
  );
}

export default MeetingList;
