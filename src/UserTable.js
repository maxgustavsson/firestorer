// UserTable.js

import React, { useState, useEffect } from "react";
import db from "./firebase";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("users").get();
        const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await db.collection("users").doc(userId).delete();
      console.log("Document deleted successfully!");
      // Update the state to reflect the changes
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
            {/* Add more headers for additional fields */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
              {/* Add more cells for additional fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
