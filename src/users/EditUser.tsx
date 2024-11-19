import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import useFetch from "../hooks/useFetch";

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

const EditUser: React.FC = () => {
  const { setUsers, users } = useContext(UserContext);
  const {putFetch} = useFetch<User>("http://localhost:3001/data");

  const { id } = useParams();

  const navigate = useNavigate();
  //  Because no MongoDB

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const findUser = users.find((u) => u._id === id);
    if (findUser) {
      setFullName(findUser.fullName);
      setEmail(findUser.email);
      setPhone(findUser.phone);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    putFetch( { fullName, email, phone },id);
    // setUsers((prevUsers) =>
    //   prevUsers.map((user) =>
    //     user._id === id ? { ...user, fullName, email, password, img } : user
    //   )
    // );
    navigate("/users/display");
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
            <label htmlFor="phone">phone</label>
            <input
              id="phone"
              type="number"
              value={phone}
              placeholder="Enter your phone"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>

          <button type="submit">Save!!</button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
