import React from "react";
import "./CatAdd.css";
import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
const CatAdd = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/api/category/add",
        {
          name,
          description,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <form className="CatAddForm" onSubmit={handleSubmit}>
      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Category Name</p>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="outlined-basic"
          label="Enter Category Name"
          variant="outlined"
          required
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Category Name</p>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="outlined-basic"
          label="Enter Description"
          variant="outlined"
          required
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "7rem",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          marginTop: "1rem",
          backgroundColor: "black",
          color: "white",
        }}
      >
        ADD
      </Button>
    </form>
  );
};

export default CatAdd;
