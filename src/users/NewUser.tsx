import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
// import { UserContext } from "../providers/UserProvider";

interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  image?: string;
  createdAt: Date;
}

export default function NewUser() {
  const { postFetch } = useFetch<User>("http://localhost:3001/data");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postFetch({ fullName, email, password, phone }, "/");

    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">User Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              placeholder="Enter your User Name"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              placeholder="Enter your Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">phone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>

          <button type="submit">Add New User</button>
        </form>
      </div>
    </>
  );
}
