import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./userContext";

function Profile({ update }) {
  const { user } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    hobbies: user.hobbies || "",
    interests: user.interests || "",
    radius: user.radius || "",
    zipcode: user.zipcode || "",
    profileImg: null, // Added for image upload
  });

  const [errors, setErrors] = useState([]);
  const [updated, setUpdated] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleImageChange(evt) {
    setFormData((fData) => ({
      ...fData,
      profileImg: evt.target.files[0],
    }));
  }

  function handleError(error) {
    console.log("error in handleErrors is...", error);
    setErrors([...error]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }
      await update(user.email, formData);
    } catch (error) {
      handleError(error);
      return;
    }
    handleError([]);
    setUpdated(true);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 ">
          <img
            className="img-fluid"
            src={user.profile_img_url}
            alt="Your future profile pic."
          />
        </div>
        <div className="col-6 col mx-auto text-black ">
          <div className="text-center">
            <h2>Profile</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white py-4 px-4"
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label text-start w-100">
                First name
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                id="firstName"
                value={formData?.firstName || ""}
                onChange={handleChange}
                aria-describedby="firstNameHelp"
                aria-required="true"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label text-start w-100">
                Last name
              </label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                id="lastName"
                value={formData?.lastName || ""}
                onChange={handleChange}
                aria-describedby="lastNameHelp"
                aria-required="true"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="interests" className="form-label text-start w-100">
                Interests
              </label>
              <input
                name="interests"
                type="interests"
                className="form-control"
                id="interests"
                value={formData?.interests || ""}
                onChange={handleChange}
                aria-describedby="interestsHelp"
                aria-required="true"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hobbies" className="form-label text-start w-100">
                Hobbies
              </label>
              <input
                name="hobbies"
                type="hobbies"
                className="form-control"
                id="hobbies"
                value={formData?.hobbies || ""}
                onChange={handleChange}
                aria-describedby="hobbiesHelp"
                aria-required="true"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="radius" className="form-label text-start w-100">
                Match Radius
              </label>
              <input
                name="radius"
                type="radius"
                className="form-control"
                id="radius"
                value={formData?.radius || ""}
                onChange={handleChange}
                aria-describedby="radiusHelp"
                aria-required="true"
                required
              />
            </div>
            {/* //TODO: add zipcode verification */}
            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label text-start w-100">
                Zipcode
              </label>
              <input
                name="zipcode"
                type="zipcode"
                pattern="^\d{5}$"
                className="form-control"
                id="zipcode"
                value={formData?.zipcode || ""}
                onChange={handleChange}
                aria-describedby="zipcodeHelp"
                aria-required="true"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profileImg" className="form-label text-start w-100">
                Profile Image
              </label>
              <input
                name="profileImg"
                type="file"
                className="form-control"
                id="profileImg"
                accept="profileImg/*"
                onChange={handleImageChange}
              />
            </div>

            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <p key={index} className="mb-0 small">
                    Error: {error}
                  </p>
                ))}
              </div>
            )}
            {updated && (
              <p className="alert alert-success">Updated Successfully</p>
            )}
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
