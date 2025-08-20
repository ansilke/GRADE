import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <div className="ml-10 flex w-[50px] h-[100vh] items-center justify-center flex-col mr-14 ">
        

        <div onClick={() => navigate("/admindashboard")} className="relative group w-fit">
        <img
          className="w-[45px] h-[45px] mb-11 hover:cursor-pointer  transform transition-transform duration-300 hover:scale-120"
          src="https://img.icons8.com/?size=100&id=TPXhNjRudwmY&format=png&color=000000"
          alt="dashboard"
        />
         <span
             className="absolute left-20 top-6 -translate-x-1/2 
             bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
             opacity-0 scale-90 translate-y-1
             group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
             transition-all duration-300 ease-in"
          >
            Dashboard
          </span>
        </div>

        <div onClick={() => navigate("/mentorlist")} className="relative group w-fit">
        <img
          className="w-[45px] h-[45px] mb-11 hover:cursor-pointer  transform transition-transform duration-300 hover:scale-120"
          src="https://img.icons8.com/?size=100&id=60013&format=png&color=000000"
          alt="mentor"
        />
         <span
          className="absolute left-20 top-6 -translate-x-1/2 
          bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
          opacity-0 scale-90 translate-y-1
          group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
          transition-all duration-300 ease-in"
          >
            Mentors
          </span>
        </div>

        <div onClick={() => navigate("/studentlist")} className="relative group w-fit">
        <img
          className="w-[45px] h-[45px] mb-11 hover:cursor-pointer  transform transition-transform duration-300 hover:scale-120"
          src="https://img.icons8.com/?size=100&id=79604&format=png&color=000000"
          alt="students"
        />
        <span
           className="absolute left-20 top-6 -translate-x-1/2 
           bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
           opacity-0 scale-90 translate-y-1
           group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
           transition-all duration-300 ease-in"
          >
            Students
          </span>
        </div>

        <div onClick={() => navigate("/courselist")} className="relative group w-fit">
        <img
          className="w-[45px] h-[45px] mb-11 hover:cursor-pointer  transform transition-transform duration-300 hover:scale-120"
          src="https://img.icons8.com/?size=100&id=79255&format=png&color=000000"
          alt="courses"
        />
         <span
            className="absolute left-20 top-6 -translate-x-1/2 
            bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
            opacity-0 scale-90 translate-y-1
            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
            transition-all duration-300 ease-in"
          >
            Courses
          </span>
        </div>

        <div onClick={() => navigate("/reviewlist")} className="relative group w-fit">
        <img
          className="w-[45px] h-[45px] mb-11  hover:cursor-pointer  transform transition-transform duration-300 hover:scale-120"
          src="https://img.icons8.com/?size=100&id=WLXjp8v1lQpQ&format=png&color=000000"
          alt="reviews"
        />
         <span
            className="absolute left-20 top-6 -translate-x-1/2 
            bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
            opacity-0 scale-90 translate-y-1
            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
            transition-all duration-300 ease-in"
          >
            Reviews
          </span>
        </div>

        <div onClick={() => navigate("/")} className="relative group w-fit">
          <img
            className="w-[45px] h-[45px] mb-11 hover:cursor-pointer transform transition-transform duration-300 hover:scale-120"
            src="https://img.icons8.com/?size=100&id=59781&format=png&color=000000"
            alt="logout"
          />
          <span
           className="absolute left-20 top-6 -translate-x-1/2 
           bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
           opacity-0 scale-90 translate-y-1
           group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
           transition-all duration-300  ease-in"
          >
            Logout
          </span>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
