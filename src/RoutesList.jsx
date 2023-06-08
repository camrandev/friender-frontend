import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import userContext from "./userContext";

 /** DESCRIPTION
*
* Props:
*
* State:
*
* PARENT -> RoutesList -> {CHILDREN}
*/

function RoutesList ({login, signup, update}) {
  const { user } = useContext(userContext);


  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignUpForm signUp={signUp}/>} />
      {user &&
      <>
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/matches" element={<Profile update={update} />} />
      </>
      }
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default RoutesList;