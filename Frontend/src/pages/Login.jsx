import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ShopContext } from "../context/ShopContext";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmitHandler = async (event) => {
    console.log("boo");
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        console.log(name, email, phoneNumber, password);
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          phoneNumber,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

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
            sx={{
              color: "#ddd",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "& .MuiInputLabel-root": {
                color: "#ddd",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ddd",
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "#ddd",
                opacity: 1,
              },
            }}
          />

          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            type="number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            sx={{
              color: "#ddd",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "& .MuiInputLabel-root": {
                color: "#ddd",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ddd",
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "#ddd",
                opacity: 1,
              },
            }}
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
        sx={{
          color: "#ddd",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "& .MuiInputLabel-root": {
            color: "#ddd",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ddd",
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#ddd",
            opacity: 1,
          },
        }}
      />

      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        sx={{
          color: "#ddd",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "& .MuiInputLabel-root": {
            color: "#ddd",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#ddd",
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "#ddd",
            opacity: 1,
          },
        }}
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
      <Button variant="contained" type="submit">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};
export default Login;
//
