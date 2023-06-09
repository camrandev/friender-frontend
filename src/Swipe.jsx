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

function Swipe() {
  const { user } = useContext(userContext);
  const [potentials, setPotentials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(potentials);

  //use effect to get the list of potential matches
  useEffect(() => {
    async function getPotentialMatches() {
      try {
        const res = await FrienderApi.getPotentialMatches(user.email);
        setPotentials(res);
        setIsLoading(false);
      } catch (err) {
        console.log("error loading potentials", err);
      }
    }
    getPotentialMatches();
  }, []);

  //like()
  //calls the FrienderApi Method to like a user and updates state to next user
  async function like() {
    try {
      const updatedPotentials = await FrienderApi.likePotential(
        user.email,
        potentials[0].id
      );
      setPotentials(updatedPotentials);
    } catch (err) {
      console.log("error liking the potential", err);
    }
  }

  //reject()
  //calls the FrienderApi method to reject a user + updates state to next
  async function reject() {
    try {
      const updatedPotentials = await FrienderApi.rejectPotential(
        user.email,
        potentials[0].id
      );
      setPotentials(updatedPotentials);
    } catch (err) {
      console.log("error liking the potential", err);
    }
  }

  if (isLoading)
    return (
      <h1 className="position-absolute top-50 start-50 text-white">
        Loading....
      </h1>
    );

  if (isLoading)
    return <h1 className="position-absolute top-50 start-50 ">Loading....</h1>;

  const match = potentials?.length > 0 ? potentials[0] : null;

  if (!match)
    return (
      <h1 className="position-absolute top-50 start-50 ">No more matches...</h1>
    );

  return (
    <div>
      <div className="d-flex flex-row">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={match.profile_img_url || ""}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {match.firstName} {match.lastName}
            </h5>
            <p className="card-text">Interests: {match.interests}</p>
            <p className="card-text">Hobbies: {match.hobbies}</p>
            <div className="d-flex justify-content-between">
              <span onClick={reject} className="btn btn-danger">
                Reject
              </span>
              <span onClick={like} className="btn btn-success">
                Like
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swipe;
