import React, { useState } from "react";
import "../Stylesheets/SubList.css";
import ProfileCard from "./ProfileCard";

export default function UserPanel(props) {
  return (
    <div id="userpanel">
        <ProfileCard user={props.user}/>
    </div>
  );
}