import React, { useState, useEffect, useContext } from "react";
import FrienderApi from "./api";
import userContext from "./userContext";

/** DESCRIPTION
 *
 * Props:
 *
 * State:
 *
 * PARENT -> Swipe -> {CHILDREN}
 */

const test = [1, 2, 3, 4, 5];

function Swipe() {
  const { user } = useContext(userContext);
  const [potentials, setPotentials] = useState(test);
  const [isLoading, setIsLoading] = useState(true);
  console.log(potentials);

  //use effect to get the list of potential matches
  useEffect(() => {
    async function getPotentialMatches() {
      try {
        const res = await FrienderApi.getPotentialMatches(user.email);
        setPotentials(res);
        setIsLoading(false);
      } catch(err) {
        console.log('error loading potentials', err)
      }
    }
    getPotentialMatches();
  }, []);


  //like()
  //calls the FrienderApi Method to like a user and updates state to next user
  async function like() {
    try {
      const updatedPotentials = await FrienderApi.likePotential(user.email, potentials[0].id);
      setPotentials(updatedPotentials);
    } catch(err) {
      console.log('error liking the potential', err)
    }
  }

  //reject()
  //calls the FrienderApi method to reject a user + updates state to next
  async function reject() {
    try {
      const updatedPotentials = await FrienderApi.rejectPotential(user.email, potentials[0].id);
      setPotentials(updatedPotentials);
    } catch(err) {
      console.log('error liking the potential', err)
    }
  }

  if (isLoading)
    return (
      <h1 className="position-absolute top-50 start-50 text-white">
        Loading....
      </h1>
    );

  return (
    <div>
      <div className="d-flex flex-row">
        <button onClick={reject}>Reject</button>
        <div>{potentials[0].email || "no more matches"}</div>
        <button onClick={like}>Like</button>
      </div>
    </div>
  );
}

export default Swipe;
