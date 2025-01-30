import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { TextField, InputAdornment, Box, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("all-products")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <Box
      sx={{
        marginTop: "10px",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)", // Subtle white border
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "#5499ff",
        textAlign: "center",
        padding: "1.2rem", // Increased padding
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      {" "}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: "1px",
          borderColor: "rgba(0, 0, 0, 0.1)", // Subtle border
          padding: "0.5rem",
          margin: "0.5rem auto", // Center the box
          borderRadius: "16px", // Slightly reduced border radius
          width: "60%", // Slightly narrower for better proportion
          maxWidth: "800px", // Maximum width limit
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)", // Subtle shadow
        }}
      >
        {" "}
        <TextField
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            outline: "none",
            background: "inherit",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent", // Remove default TextField border
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
          InputProps={{
            sx: {
              height: "2.75rem", // Slightly reduced height
              fontSize: "1rem", // Increased font size
              "&::placeholder": {
                color: "#666", // Darker placeholder text
              },
            },
            endAdornment: (
              <InputAdornment position="end">
                {" "}
                <IconButton>
                  {" "}
                  <SearchIcon />{" "}
                </IconButton>{" "}
              </InputAdornment>
            ),
          }}
        />{" "}
      </Box>{" "}
    </Box>
  ) : null;
};

export default Searchbar;
