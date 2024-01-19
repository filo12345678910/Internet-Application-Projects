import React from "react";

export default function UserList({ users }) {
  return (
    <div>
      <h2>Online Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.nick}</li>
        ))}
      </ul>
    </div>
  );
}
