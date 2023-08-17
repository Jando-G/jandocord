import { useEffect, useState } from 'react';

export default function AddFriend(props) {

    const addFriend = (e)=> {
        e.preventDefault();

        const params = {
          username: e.target[0].value,
          discriminator: e.target[1].value === "" ? "0" : e.target[1].value
        }

      fetch("http://localhost:5000/user/addfriend", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(params),
      }).then(res => {
        if(!res.ok) {
          throw new Error('Request failed with status: ' + res.status);
        }
        return res.json();
      }).then(data => {
        console.log(data.message)
      }).catch(err => {
        console.error(err);
      })
    }

  return (
    <div className="subbtn">
      <div>Add Friend</div>
      <form id="friendform" onSubmit={addFriend}>
        <input type="text" id="username" name="username" placeholder="username" required/>
        <div>#</div>
        <input type="number" id="discriminator" name="discriminator" placeholder="id"/>
        <input type="Submit" />
      </form>
    </div>
  );
}