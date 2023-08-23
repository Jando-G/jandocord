import React from "react";
import "../Stylesheets/SubList.css";
import ProfileCard from "./ProfileCard";
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';

export default function UserPanel(props) {

  const logout = async () => {
    try {
      const response = await fetch(`${props.url}/auth/logout`, {
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

  return (
    <div id="userpanel">
        <ProfileCard user={props.user}/>
        <Icon path={mdiLogout} size={1} color="#6d6f77" onClick={logout}/>
    </div>
  );
}