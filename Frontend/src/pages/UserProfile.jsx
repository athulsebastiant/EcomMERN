import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const UserProfile = () => {
  return (
    <div>
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="filled" />
      <TextField id="outlined-basic" label="Phone Number" variant="filled" />
      <TextField id="outlined-basic" label="Password" variant="filled" />
      <Button variant="contained">Edit</Button>
    </div>
  );
};

export default UserProfile;
