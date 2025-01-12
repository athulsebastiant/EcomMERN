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
        borderTop: "1px solid",
        borderBottom: "1px solid",
        backgroundColor: "#f9fafb",
        textAlign: "center",
        p: 1,
      }}
    >
      {" "}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#cbd5e0",
          p: 1,
          my: 1,
          mx: 1,
          borderRadius: "9999px",
          width: "75%",
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
            fontSize: "0.875rem",
          }}
          InputProps={{
            sx: { height: "3rem", fontSize: "0.875rem" },
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
