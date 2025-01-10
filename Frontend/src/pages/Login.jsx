import React, { useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form className="loginForm" onSubmit={onSubmitHandler}>
      <div className="loginMainDiv">
        <p className="loginP">{currentState}</p>
        <hr className="hrLogin" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          required
        />
      )}

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        required
      />

      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        required
      />
      {currentState === "Login" ? (
        <p
          onClick={() => setCurrentState("Sign Up")}
          style={{ cursor: "pointer" }}
        >
          Create Account
        </p>
      ) : (
        <p
          onClick={() => setCurrentState("Login")}
          style={{ cursor: "pointer" }}
        >
          Login Here
        </p>
      )}
      <Button variant="contained">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};
export default Login;
//
