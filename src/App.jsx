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
 * context: adds user to contetx
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

  async function login(formData) {
    const newToken = await FrienderApi.login(formData);
    setToken(newToken);
  }

  /**allows a new user to sign up */
  async function signUp(formData) {
    const newToken = await FrienderApi.signup(formData);
    setToken(newToken);
  }

  /**allows a user to update their own info when logged in */
  async function update(email, updatedData) {
    const userInfo = await FrienderApi.updateProfile(email, updatedData);
    setUser({ ...userInfo });
  }

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
      <h1 className="position-absolute top-50 start-50 text-white">
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
