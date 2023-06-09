import React, { useState, useEffect } from 'react';

 /** DESCRIPTION
*
* Props:
*
* State:
*
* PARENT -> Matches -> {CHILDREN}
*/


const test = [1, 2, 3, 4, 5,]

function Matches () {
  const [users, setUsers] = useState(test);
  console.log(users)

  //use effect to get the list of potential matches
  // useEffect(() => {

  // }, [])


  //not 100% sure where these will live

  //like()
  //calls the FrienderApi Method to like a user and updates state to next user
  function like() {
    console.log(users[0])
    // users.slice(0,1)
    // setUsers((curr)=>[...newUsers
    // ])
  }

  //reject()
  //calls the FrienderApi method to reject a user + updates state to next

  return (
    <div>
      <div className="d-flex flex-row">
        <button>Reject</button>
        <div>{users[0] || "no more matches"}</div>
        <button onClick={like}>Like</button>


      </div>
    </div>
  )
}

export default Matches;