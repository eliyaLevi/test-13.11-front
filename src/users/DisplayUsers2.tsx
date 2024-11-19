import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { StarsContext } from "../providers/StarProvider";
// import useFetch from "../hooks/useFetch";
import { AuthContext } from "../providers/AuthProvider";
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

export default function DisplayUsers2() {
  // step 4
  // Use the useContext
  const { user, logout } = useContext(AuthContext) ?? {};

  const [users, setUsers] = useState<User[]>();

  const { stars, setStars } = useContext(StarsContext);
  const { deleteFetch, getFetch, data } = useFetch<User[]>(
    "http://localhost:3001/data"
  );

  useEffect(() => {
    getFetch();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(1);

      console.log(data);
      return setUsers(data);
    } else {
      console.log("No data Brooooo...");
    }
  }, [data]);

  return (
    <>
      <PageHeader
        title="From Context"
        subtitle="This is the main page of users"
      />
      <NavLink to={"/users/adduser"} className="add-user-link">
        Add user
      </NavLink>
      <button
        onClick={() => {
          logout!();
        }}
      >
        logout
      </button>

      <div className="card-list">
        {users &&
          users.map((user) => (
            <div key={user._id} className="user-card">
              <img
                src={user.image}
                alt={`${user.fullName}'s avatar`}
                className="user-avatar"
              />
              <div className="user-info">
                <h3>{user.fullName}</h3>
                <p>Email: {user.email}</p>
              </div>
              <button
                onClick={() => {
                  deleteFetch(user._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  // setStars([...stars, user]);
                }}
              >
                Add Star
              </button>
              <button>
                <NavLink to={`/users/edit/${user._id}`}>Edit user</NavLink>
              </button>
              <div className="user-actions"></div>
            </div>
          ))}
      </div>
      <PageHeader title="Stars" subtitle="This is my STAR'S!!" />
      {/* <div className="card-list">
        {stars!.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={user.img}
              alt={`${user.username}'s avatar`}
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
            </div>
            <button
              onClick={() => {
                deleteFetch(id)
              }}
            >
              Delete
            </button>
            <div className="user-actions"></div>
          </div>
        ))}
      </div> */}
      {stars.length === 0 && <h1>Sorry but there no Stars</h1>}
    </>
  );
}
