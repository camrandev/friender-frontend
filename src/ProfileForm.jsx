import { useState } from "react";

function ProfileForm({updateProfile}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission.
    // For example, you could use the selectedFile state variable to send the file to a server.
    let formData = new FormData();

    // Append the text inputs to the form data
    formData.append("name", "John Doe");
    formData.append("email", "john.doe@example.com");
    if (fileInput.files[0]) {
      formData.append('file', fileInput.files[0]);
  }


    updateProfile(formData)

    console.log(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProfileForm;
