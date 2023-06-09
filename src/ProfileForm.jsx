import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "./userContext";

function Profile({ update }) {
  const { user } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    image: null, // Added for image upload
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
      image: evt.target.files[0],
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
      await update(form);
    } catch (error) {
      handleError(error);
      return;
    }
    handleError([]);
    setUpdated(true);
  }

  return (
    <div className="col-6 col mx-auto position-absolute top-50 start-50 translate-middle text-black ">
      <h2 className="text-white">Profile</h2>
      <form onSubmit={handleSubmit} className="bg-white py-4 px-4" encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
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
          <label htmlFor="lastName" className="form-label">
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            value={formData?.email || ""}
            onChange={handleChange}
            aria-describedby="emailHelp"
            aria-required="true"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Profile Image
          </label>
          <input
            name="image"
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
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
        {updated && <p className="alert alert-success">Updated Successfully</p>}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Profile;
