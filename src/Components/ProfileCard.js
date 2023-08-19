import React, { useState } from "react";
import "../Stylesheets/SubList.css";
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

export default function UserPanel(props) {

  return (
    <div className="profilecard" onClick={props.onClick}>
        <img src={`https://cdn.discordapp.com/avatars/${props.user.discordId}/${props.user.avatar}`} alt="Avatar"></img>
        <div className="username">{props.user.username} <span style={{ color: '#6d6f77' }}>{props.user.discriminator !== "0" ? `#${props.user.discriminator}` : ""}</span></div>
        {props.user.id && <Icon path={mdiDelete} size={1} color="#6d6f77" onClick={(e=> {
          e.stopPropagation();
          props.removeFriend();
        })}/>}
    </div>
  );
}