import { useEffect, useState } from 'react';
import _debounce from 'lodash/debounce';
import ProfileCard from './ProfileCard';

export default function AddFriend(props) {

  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async (searchQuery) => {
    //don't search for users if it doesn't even match the right pattern
    const cleanedInput = searchQuery.replace(/\s/g, '');
    const pattern = /^(?=[a-zA-Z0-9_.#]*$)(?!.*[#].*#)[a-zA-Z0-9_.]*#?(\d{4})?$/;
    if (!pattern.test(cleanedInput)) {
      return null;
    }

    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/search?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  const addFriend = (e)=> {
      e.preventDefault();

      //don't search for users if it doesn't even match the right pattern
      const cleanedInput = e.target[0].value.replace(/\s/g, '');
      const pattern = /^(?=[a-zA-Z0-9_.#]*$)(?!.*[#].*#)[a-zA-Z0-9_.]*#?(\d{4})?$/;
      if (!pattern.test(cleanedInput)) {
        return null;
      }

      // Extract username and discriminator
      const match = cleanedInput.match(pattern);
      const username = match[0].includes('#') ? match[0].slice(0, -5) : match[0];
      const discriminator = match[1] || '0';

      const params = {
        username: username,
        discriminator: discriminator
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
        //oh my this is so ugly what am I doin dawg
        const newFriends = data.user.friends.map((friend, index) => (
          <ProfileCard
            user={friend}
            key={index}
            onClick={() => props.setFriend(friend)}
          />
        ));
        props.setFriends(newFriends);
      }).catch(err => {
        console.error(err);
      })
  }

  const debouncedSearch = _debounce(handleSearch, 300);

  const fillName = (userName, discriminator) => {
    const input = document.getElementById("username");
    let mashedString = userName + "#" + discriminator;
    if (mashedString.endsWith("#0")) {
      mashedString = mashedString.slice(0, -2);
    }
    input.value = mashedString;
    setSearchResults([])
  }

  return (
    <div className="subbtn">
      <div>Add Friend</div>
      <form id="friendform" onSubmit={addFriend}>
        <input 
          type="text" 
          id="username" 
          name="username" 
          placeholder="username#1234" 
          onChange={(e) => debouncedSearch(e.target.value)} 
          autoComplete="off" 
          minLength="2"
          maxLength="37"
          required/>
        <input type="Submit" defaultValue="Add"/>
      </form>
      {searchResults.map((result, index) => (
          <ProfileCard 
          key={index} 
          user={{avatar: result.avatar, discordId: result.discordId, discriminator: result.discriminator, username: result.username}}
          onClick={()=>fillName(result.username, result.discriminator)}/>
        ))}
    </div>
  );
}