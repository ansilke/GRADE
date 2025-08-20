import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Admindashboard from "../Components/Admindashboard";
import Adminlogin from "../Components/Adminlogin";
import Mentorlist from "../Components/Mentorlist";
import Studentlist from "../Components/Studentlist";
import Courselist from "../Components/Courselist";
import Reviews from "../Components/Reviews";


function LayoutRoutes() {  
  return (
    <>
      <BrowserRouter>
            <Routes>
        <Route path="/" element={<Adminlogin/>}/>
        <Route path="/admindashboard" element={<Admindashboard/>}/>
        <Route path="/mentorlist" element={<Mentorlist/>}/>
        <Route path="/studentlist" element={<Studentlist/>}/>
        <Route path="/courselist" element={<Courselist/>}/>
        <Route path="/reviewlist" element={<Reviews/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default LayoutRoutes
