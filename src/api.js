import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5173/";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class FrienderApi {
  static token;

  /** base api request function */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {Authorization: `Bearer ${FrienderApi.token}`};
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.log("error from (non)response=", err);
      if (err.response) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
      }
      throw new Error(err.message);
    }
  }

  // Individual API routes

  /** Login a user.
   *  {email, password} -> {token}
   */
  static async login(email, password) {
    let res = await this.request(`login`, {email, password}, "post");
    this.token = res.access_token;
    return res.access_token;
  }

   /** Signup a user.
   *  {email, password} -> {token}
   */
  static async signup(email, password) {
    let res = await this.request(`signup`, {email, password}, "post");
    this.token = res.access_token;
    return res.access_token;
  }

   /** Update a user profile.
   *  {email, firstName, lastName, password, email} -> {user}
   */
  static async updateProfile(email, updatedData) {
    let res = await this.request(`user/${email}/update`, updatedData, "patch");
    return res.user;
  }

  /** Get a user.
   *  {email, token} -> {user}
   */
  static async getUser(email) {
    let res = await this.request(`user/${email}`, {token: this.token});
    return res.user;
  }

   /** Get a user's potential matches.
   *  {email, token} -> {potentials}
   */
  static async getPotentialMatches(email) {
    let res = await this.request(`user/${email}/potentials`, {token: this.token});
    return res.potentials;
  }

     /** Signup a user.
   *  {email, password} -> {token}
   */
     static async uploadProfilePhoto(email, photo) {
      let res = await this.request(`user/${email}/s3`, {}, "post");
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    // }

      this.token = res.access_token;
      return res.access_token;
    }
}
