import React from 'react'
import { NavLink } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./Sidebar.css"
const Sidebar = () => {
  return (
    <div className='SidebarPartition'>

    <div className='CombinedSidebar'>

    <NavLink to={"/add"} className="custom-navlink">
    <AddCircleIcon sx={{ fontSize:30, width:"1.25 rem", height:"1.25 rem" }} color="success"/>
    <p>Add Products</p></NavLink>




    </div>



    </div>
  )
}

export default Sidebar