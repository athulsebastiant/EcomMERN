import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(backendUrl);
      // console.log(email, password);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="centeredContainer">
      <div className="loginMainDiv">
        <h1 className="loginH1">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="inputDiv">
            <p className="para">Email Address</p>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              id="filled-basic"
              label="Email"
              variant="filled"
              required
              type="email"
              sx={{ width: 1 }}
            />
          </div>

          <div className="inputDiv">
            <p className="para">Password</p>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              id="filled-basic"
              label="Password"
              variant="filled"
              required
              type="password"
              sx={{ width: 1 }}
            />
          </div>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{
              marginTop: "0.5rem",
              width: "100%",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
