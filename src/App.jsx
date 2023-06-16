import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import FrienderApi from "./api";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";
import useLocalStorage from "./useLocalStorage";

/** App returns our BrowserRouter with the NavBar component and the RoutesList component
 *
 * Props: None
 *
 * state:
 * - token(str),
 * - isloading(bool)
 * - user
 *
 * context: adds user object to userContext
 *
 * App -> {Routeslist, NavBar}
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage();
  const [user, setUser] = useState(null);

  /**logs the current user out */
  function logout() {
    setIsLoading(false);
    setToken("");
    setUser(null);
  }

  /**logs in an existing user */
  async function login(formData) {
    const newToken = await FrienderApi.login(formData);
    setToken(newToken);
  }

  /**signs up a new user*/
  async function signUp(formData) {
    const newToken = await FrienderApi.signup(formData);
    setToken(newToken);
  }

  /**updates the profile for an existing user */
  async function update(email, updatedData) {
    const userInfo = await FrienderApi.updateProfile(email, updatedData);
    setUser({ ...userInfo });
  }

  /**if a token is present, fetch the user associated with the token
   * and add the user to userContext
   */
  useEffect(() => {
    async function getUserData() {
      if (token !== "") {
        const { sub: email } = jwt_decode(token);
        FrienderApi.token = token;
        const userInfo = await FrienderApi.getUser(email);
        setIsLoading(false);
        setUser({ ...userInfo });
      } else {
        console.log("lol");
        setIsLoading(false);
      }
    }
    getUserData();
  }, [token]);

  //NOTE: need to modify, as we are potentially storing user matches state lower down
  if (isLoading)
    return (
      <h1 className="position-absolute top-50 start-50">
        Loading....
      </h1>
    );

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <NavBar logout={logout} />
          <RoutesList login={login} signUp={signUp} update={update} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
