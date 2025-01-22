import React from "react";
import {
  List,
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PaidIcon from "@mui/icons-material/Paid";
import "./Sidebar.css";
const Sidebar = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <div className="SidebarPartition">
      <div className="CombinedSidebar">
        <List component="nav" className="sidebar-nav">
          {/* Products Dropdown */}
          <ListItemButton
            onClick={() => setProductsOpen(!productsOpen)}
            className="dropdown-header"
          >
            <ListItemIcon>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {productsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={productsOpen} timeout="auto" unmountOnExit>
            <List component="div" className="nested-list">
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
            </List>{" "}
          </Collapse>

          <ListItemButton
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="dropdown-header"
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
            <List component="div" className="nested-list">
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
            </List>
          </Collapse>

          <ListItemButton
            onClick={() => setOrderOpen(!orderOpen)}
            className="dropdown-header"
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {orderOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={orderOpen} timeout="auto" unmountOnExit>
            <List component="div" className="nested-list">
              <NavLink to={"/orders"} className="custom-navlink">
                <AddIcon
                  sx={{
                    fontSize: 30,
                    width: "1.25 rem",
                    height: "1.25 rem",
                    color: "green",
                  }}
                />
                <p>Manage Orders</p>
              </NavLink>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
