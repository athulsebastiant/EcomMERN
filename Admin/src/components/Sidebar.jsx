import React from "react";
import { NavLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="SidebarPartition">
      <div className="CombinedSidebar">
        <NavLink to={"/add"} className="custom-navlink">
          <AddCircleIcon
            sx={{ fontSize: 30, width: "1.25 rem", height: "1.25 rem" }}
            color="success"
          />
          <p>Add Products</p>
        </NavLink>

        <NavLink to={"/update"} className="custom-navlink">
          <EditIcon
            sx={{
              fontSize: 30,
              width: "1.25 rem",
              height: "1.25 rem",
              color: "grey",
            }}
          />
          <p>Update Products</p>
        </NavLink>

        <NavLink to={"/remove"} className="custom-navlink">
          <RemoveCircleIcon
            sx={{
              fontSize: 30,
              width: "1.25 rem",
              height: "1.25 rem",
              color: "red",
            }}
          />
          <p>Remove Products</p>
        </NavLink>

        <NavLink to={"/catAdd"} className="custom-navlink">
          <AddIcon
            sx={{
              fontSize: 30,
              width: "1.25 rem",
              height: "1.25 rem",
              color: "green",
            }}
          />
          <p>Add Category</p>
        </NavLink>

        <NavLink to={"/catEdit"} className="custom-navlink">
          <EditOutlinedIcon
            sx={{
              fontSize: 30,
              width: "1.25 rem",
              height: "1.25 rem",
              color: "blue",
            }}
          />
          <p>Update Category</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
