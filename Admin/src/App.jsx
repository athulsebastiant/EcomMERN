import React from "react"
import './App.css'
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
function App() {
  
  return (
    <div className="MainPositioning">
    <>
    <Navbar></Navbar>
<hr />
<div className="Sidebar">
<Sidebar></Sidebar>

</div>
    </>
    </div>
  )
}

export default App
