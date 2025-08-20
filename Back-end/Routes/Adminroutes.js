import express from "express"
import {checkadmin, creatementor, editmentor, getmentor,createstudent,getstudent, editstudent, createcourse, getcourse, updatecourse, toggleStudentStatus, toggleMentorStatus, toggleCourseStatus, } from "../Controller/Admincontroller.js"


const adminroutes =express()

adminroutes.post ("/checkadmin",checkadmin)
adminroutes.post ("/creatementor",creatementor);
adminroutes.get ("/getmentor",getmentor);
adminroutes.post ("/editmentor",editmentor);
adminroutes.post ("/createstudent",createstudent);
adminroutes.get ("/getstudent",getstudent)
adminroutes.post ("/editstudent",editstudent)
adminroutes.post("/createcourse",createcourse)
adminroutes.get ("/getcourse",getcourse)
adminroutes.put("/updatecourse/:id", updatecourse);  // ✅ not updatedCourse
adminroutes.put("/student/status/:id", toggleStudentStatus);
adminroutes.put("/mentor/status/:id", toggleMentorStatus);
adminroutes.put("/course/status/:id", toggleCourseStatus);









export default adminroutes