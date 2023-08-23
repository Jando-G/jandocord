import React, { useState, useEffect} from "react";
import ProfileCard from "./ProfileCard";
import AddFriend from "./AddFriend";
import UserPanel from "./UserPanel";
import Content from "./Content";	
import "../Stylesheets/Home.css";
import Icon from '@mdi/react';
import { mdiArrowRightDropCircle } from '@mdi/js';
import { mdiArrowLeftDropCircle } from '@mdi/js';

export default function Login(props) {

  const [friend, setFriend] = useState(null);
  const [friends, setFriends] =useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSwipe = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const removeFriend = (friendId) => {
    fetch(`${props.url}/user/removefriend/${friendId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then(res => {
        if(!res.ok) {
          throw new Error('Request failed with status: ' + res.status);
        }
        return res.json();
      }).then(() => {
         //clear friend if currently viewing deleted friend
         if(friend && friend.id === friendId) {
           setFriend(null);
          }
         // for some reason mongoose not returning updated friends. it is what it is.
         const newFriends = friends.filter((friend) => friend.id !== friendId);
         setFriends(newFriends);
      }).catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    if (props.user.friends) {
      setFriends(props.user.friends);
    }
  }, [props.user.friends]);

  return (
    <div id="home">
       <div id="sublist" className={isSidebarOpen ? '' : 'swiped'}>
        <AddFriend url={props.url} setFriends={setFriends} setFriend={setFriend}/>
        {friends.map((friend, index) => (
        <ProfileCard
          user={friend}
          key={index}
          onClick={() => setFriend(friend)}
          removeFriend={() => removeFriend(friend.id)}
        />
      ))}
        <UserPanel url={props.url} user={props.user} />
        <div id="side-circle"><Icon color="#7289da" path={isSidebarOpen ? mdiArrowLeftDropCircle : mdiArrowRightDropCircle} size={1.5} onClick={handleSwipe} /></div>
      </div>
      <div id="window" className={isSidebarOpen ? 'darkened' : ''} onClick={isSidebarOpen ? handleSwipe : undefined}>
        <Content url={props.url} friend={friend} user={props.user} socket={props.socket}/>
      </div>
    </div>
  );
}