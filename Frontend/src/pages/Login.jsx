import React, { useContext, useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitHandler = async (event) => {
    console.log("boo");
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        console.log(name, email, phone, password);
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          phone,
          password,
        });
        console.log(response.data);
      } else {
      }
    } catch (error) {}
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
        <>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            type="number"
            required
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </>
      )}

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
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
