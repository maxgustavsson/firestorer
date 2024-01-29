import React, { useState } from "react";
import db from "./firebase";
import UserTable from "./UserTable";
import './styles.css';

function App() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [feedback, setFeedback] = useState({
    message: "",
    isError: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Set the document ID to the user's username
      await db.collection("users").doc(userData.username).set({
        ...userData,
      });
  
      setFeedback({
        message: "Document added/updated successfully!",
        isError: false,
      });
  
      setUserData({
        username: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding/updating document:", error);
  
      setFeedback({
        message: "Error adding/updating document. Please try again.",
        isError: true,
      });
    }
  };
  
  return (
    <div className="app">
      <h2>Add or Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:<br></br>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:<br></br>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add or Update User</button>
      </form>
      {feedback.message && (
        <div className={feedback.isError ? "error-message" : "success-message"}>
          {feedback.message}
        </div>
      )}
      <UserTable />
    </div>
  );
}

export default App;
