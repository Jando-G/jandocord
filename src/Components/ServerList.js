import React, { useState } from "react";
import "../Stylesheets/ServerList.css";
import ServerBtn from './ServerBtn';

export default function ServerList() {
  return (
    <div id="serverlist">
        <ServerBtn />
    </div>
  );
}