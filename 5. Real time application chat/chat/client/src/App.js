import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Input from "./Input";
import UserList from "./UserList";

const socket = io("http://localhost:3000");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((m) => [...m, data]);
    });

    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    socket.on("loggedIn", () => {
      setIsLoggedIn(true);
    });

    return () => {
      socket.off("message");
      socket.off("userList");
      socket.off("loggedIn");
    };
  }, []);

  const send = (message) => {
    socket.emit("message", message);
  };

  const login = (nickname) => {
    socket.emit("login", nickname);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          {isLoggedIn ? (
            <ul>
              {messages.map((m, index) => (
                <li key={index}>
                  <strong>{m.user}:</strong> {m.text}
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <h1>Please enter your nickname:</h1>
              <Input send={login} buttonText="Login" />
            </div>
          )}
          {isLoggedIn && <Input send={send} buttonText="Send" />}
        </div>
        <div style={{ flex: 1 }}>
          {isLoggedIn && <UserList users={users} />}
        </div>
      </div>
    </div>
  );
}
