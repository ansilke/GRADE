import React from "react";
import Chart from "./Chart";
import Dashboard from "./Dashboard";

function Admindashboard() {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/daadrhhk9/image/upload/v1753778107/Admin-Dashbord_mco6xg.png)",
          backgroundSize: "100% 100%",
        }}
        className="w-[100%] h-[100vh] flex flex-row "
      >
        <Dashboard />
        <div className="flex flex-col justify-center items-center w-full h-[100vh] ">
          <div className="w-[100%] h-[30px] flex justify-end ">
          <div className="relative group w-fit">
            <img
              src="https://img.icons8.com/?size=100&id=83158&format=png&color=000000"
              alt=""
              className="w-[35px] h-[35px] mr-6 hover:cursor-pointer  transform transition-transform duration-300 hover:scale-115"
            />
             <span
             className="absolute right-6 bottom-4 -translate-x-1/2 
             bg-gray-200/80 text-black font-bold font-[Montserrat] text-xs px-2 py-1 rounded-md
             opacity-0 scale-90 translate-y-1
             group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
             transition-all duration-300 ease-in"
          >
            Notification
          </span>
            </div>
          </div>
          <div className="flex  items-start w-[90%] h-[50px]">
            <h1 className="font-bold text-xl text-[#0B1D51] font-[Montserrat]">
              Admin Dashboard
            </h1>
          </div>
          <div className="w-[90%] h-[200px] flex flex-row justify-between mb-5 ">
            <div className="w-[370px] h-[200px] bg-white/75 rounded-2xl drop-shadow-2xl flex flex-row justify-between p-7  transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col justify-between ">
                <h1 className="font-bold text-sm">Total Mentors</h1>
                <h1 className="font-extrabold text-4xl">8</h1>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=v6X1zbAEaHlY&format=png&color=000000"
                  alt=""
                  className="w-[30px] h-[30px]"
                />
              </div>
            </div>
            <div className="w-[370px] h-[200px] bg-white/75 rounded-2xl drop-shadow-2xl flex flex-row justify-between p-7 transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col justify-between ">
                <h1 className="font-bold text-sm">Total Students</h1>
                <h1 className="font-extrabold text-4xl">4</h1>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=DEg1RKY5gqD7&format=png&color=000000"
                  alt=""
                  className="w-[30px] h-[30px]"
                />
              </div>
            </div>
            <div className="w-[370px] h-[200px] bg-white/75 rounded-2xl drop-shadow-2xl flex flex-row justify-between p-7 transform transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col justify-between ">
                <h1 className="font-bold text-sm">Total Courses</h1>
                <h1 className="font-extrabold text-4xl">6</h1>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=TxizCyER0Chj&format=png&color=000000"
                  alt=""
                  className="w-[30px] h-[30px]"
                />
              </div>
            </div>
          </div>

          <div className="w-[90%] h-[440px] flex justify-center items-center bg-white/70 drop-shadow-2xl rounded-2xl transform transition-transform duration-300 hover:scale-99">
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admindashboard;
