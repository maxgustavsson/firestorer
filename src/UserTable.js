// UserTable.js

import React, { useState, useEffect } from "react";
import db from "./firebase";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("users").get();
        const userData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const sortedData = userData.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        setUsers(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [users]);

  const handleDelete = async (userId) => {
    try {
      await db.collection("users").doc(userId).delete();
      console.log("Document deleted successfully!");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };


  const sortedUsers = users.slice().sort((a, b) => {
    const aValue = sortBy ? a[sortBy] : "";
    const bValue = sortBy ? b[sortBy] : "";
    
    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Epost</th>
            <th>Datum</th>
            <th>Tid</th>
            <th></th>
            {/* Add more headers for additional fields */}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.date}</td>
              <td>{user.time}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Ta bort</button>
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
