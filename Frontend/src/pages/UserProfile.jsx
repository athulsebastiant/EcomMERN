import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import { backendUrl } from "../App";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { token } = useContext(ShopContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          backendUrl + "/api/user/get-user",
          {},
          { headers: { token } }
        );
        const { name, email, phoneNumber } = response.data.user;
        setUserData({ name, email, phoneNumber });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting", userData);
    try {
      await axios.patch(backendUrl + "/api/user/edit-user", userData, {
        headers: { token },
      });
      setIsEditing(false);
      toast.success("Successfully updated");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsEditing(true);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 4,
        }}
      >
        <Typography variant="h4">User Profile</Typography>
        <TextField
          name="name"
          label="Name"
          value={userData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          value={userData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={userData.phoneNumber}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
        {!isEditing ? (
          <Button variant="contained" onClick={handleEditClick}>
            Edit Profile
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Save Profile
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default UserProfile;
