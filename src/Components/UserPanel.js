import React, { useState, Redirect} from "react";
import "../Stylesheets/SubList.css";
import ProfileCard from "./ProfileCard";
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';

const auth = async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error('Logout failed:', response.statusText);
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

export default function UserPanel(props) {
  return (
    <div id="userpanel">
        <ProfileCard user={props.user}/>
        <Icon path={mdiLogout} size={1} color="#6d6f77" onClick={auth}/>
    </div>
  );
}