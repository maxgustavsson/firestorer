import React, { useState } from "react";
import db from "./firebase";
import UserTable from "./UserTable";
import './styles.css';

function App() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    date: "",
    time: "",
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

  const isValidUsername = (username) => {
    // Check if the username has at most 2 words and contains no special symbols
    const words = username.split(" ");
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(username);

    return words.length <= 2 && !hasSpecialSymbol;
  };

  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidTime = (time) => {
    // Add your time validation logic here if needed
    return true; // Placeholder, update based on your requirements
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the username is valid before submitting
    if (!isValidUsername(userData.username)) {
      setFeedback({
        message: "Fyll i för och efternamn.",
        isError: true,
      });
      return;
    }

    // Check if the email is valid before submitting
    if (!isValidEmail(userData.email)) {
      setFeedback({
        message: "Felaktigt epost format.",
        isError: true,
      });
      return;
    }

    if (!userData.date || !userData.time) {
      setFeedback({
        message: "Fyll i både tid och datum.",
        isError: true,
      });
      return;
    }

    // Check if the time is valid before submitting
    if (!isValidTime(userData.time)) {
      setFeedback({
        message: "Felaktigt tid format.",
        isError: true,
      });
      return;
    }

    try {
      // Set the document ID to the user's username
      await db.collection("users").doc(userData.username).set({
        ...userData,
      });

      setFeedback({
        message: "Bokat!",
        isError: false,
      });

      setUserData({
        username: "",
        email: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Problem med bokning:", error);

      setFeedback({
        message: "Fyll i alla fälten.",
        isError: true,
      });
    }
  };

  return (
    <div className="app">
      <h1>Firestore booker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Namn:<br />
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Epost:<br />
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Datum:<br />
          <input
            type="date"
            name="date"
            value={userData.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Tid:<br />
          <input
            type="time"
            name="time"
            value={userData.time}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">BOKA</button>
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
