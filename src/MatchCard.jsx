import "./MatchCard.css";
import React, { useState, useEffect } from "react";

/** DESCRIPTION
 *
 * Props:
 *
 * State:
 *
 * PARENT -> MatchCard -> {CHILDREN}
 */

function MatchCard({
  match: { firstName, lastName, interests, profile_img_url },
}) {
  console.log("props", firstName, lastName, interests, profile_img_url);
  return (
    // <div>
    //   <div className="col-sm-9 mx-auto container p-3 my-3 text-left match-card bg-white">
    //     <h4 className="match-title text-dark">
    //       {firstName} {lastName}
    //     </h4>
    //     <p className="text-dark">{interests}</p>

    //     <div className="image-container">
    //       <img
    //         src={profile_img_url}
    //         alt="match-logo"
    //         className="match-logo px-2 py-2"
    //       />
    //     </div>
    //   </div>
    // </div>

    <div className="col-sm-9 mx-auto container p-3 my-3 text-left match-card bg-white">
      <div className="row">
        <div className="col-4">
          <div className="image-container">
            <img
              src={profile_img_url}
              alt="match-logo"
              className="match-logo px-2 py-2"
            />
          </div>
        </div>
        <div className="col-8">
          <h4 className="match-title text-dark">
            {firstName} {lastName}
          </h4>
          <p className="text-dark">{interests}</p>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
