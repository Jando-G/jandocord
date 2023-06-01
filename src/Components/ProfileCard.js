import React, { useState } from "react";
import "../Stylesheets/SubList.css";

export default function UserPanel(props) {
  return (
    <div className="profilecard">
        <img src={`https://cdn.discordapp.com/avatars/${props.user.discordId}/${props.user.avatar}`} alt="Avatar"></img>
        <div className="username">{props.user.username}</div>
    </div>
  );
}