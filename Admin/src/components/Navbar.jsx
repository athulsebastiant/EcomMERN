import React from 'react'
import Button from '@mui/material/Button';
import elcorpLogo from '../assets/elcorp.png'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='positioning'>
        <img className="logo" src={elcorpLogo} alt="logo"  />
        
<Button variant="contained" sx={{ backgroundColor: '#FF5722',  '&:hover': { backgroundColor: '#E64A19',  } }} >Logout</Button>
    </div>
  )
}

export default Navbar