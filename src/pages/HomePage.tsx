import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext) ?? {};

  return (
    <div>
      <PageHeader title="HOME" subtitle="This is Eliy'a HOME page" />
      {user ? (
        <>
          <h1>Welcome {user.fullName}</h1>
          <button onClick={() => logout!()}>Logout</button>
          <p>new Branch</p>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>Please log in</NavLink>
        </>
      )}
    </div>
  );
};

export default HomePage;
