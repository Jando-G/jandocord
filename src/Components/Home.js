import React from "react";
import ServerList from "./ServerList";
import UserPanel from "./UserPanel";
import "../Stylesheets/Home.css";

export default function Login(props) {
  return (
    <div id="home">
      <ServerList />
      <div id="sublist">
        <UserPanel user={props.user}/>
      </div>
      <div id="window">
        <div id="navbar">
          <div id="options"></div>
        </div>
        <div id="content"></div>
      </div>
    </div>
  );
}