import React, { useState } from "react";
import "../Stylesheets/SubList.css";
import ProfileCard from "./ProfileCard";
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';

const logout = () => {
  
}

export default function UserPanel(props) {
  return (
    <div id="userpanel">
        <ProfileCard user={props.user}/>
        <Icon path={mdiLogout} size={1} color="#6d6f77" onClick={logout}/>
    </div>
  );
}