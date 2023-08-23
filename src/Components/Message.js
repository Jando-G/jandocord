import React from "react";
import "../Stylesheets/Messages.css";

export default function Message(props) {

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    
    // Check if the date is today or yesterday
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now - 86400000).toDateString() === date.toDateString();
  
    if (isToday) {
      return "Today at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return "Yesterday at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // For other dates, format as "date at time"
      return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  return (
  <div className="Message">
    <img src={props.image} className="image" alt="profile"/>
    <div className="content">
      <div className="info">
        <p style={{ color: "#F2F3F5" }}>{props.sender}</p>
        <p style={{ fontSize: ".8em"}}>{formatDate(props.date)}</p>
      </div>
      <p style={{ color: "#dbdee1"}}>{props.content}</p>
    </div>
  </div>
  );
}