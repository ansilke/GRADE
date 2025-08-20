import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Adminlogin() {
  const [email, setemail] = useState("");
  const [Password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(email,Password);
    
    const response=await axios.post("http://localhost:2999/admin/checkadmin", {email,Password})

    if (response.data=="done"){
      navigate("/admindashboard")
    }else{
      alert("error : "+response.data)
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/daadrhhk9/image/upload/v1753683626/Admin-login_gcwxt6.png)",
          backgroundSize: "100% 100%",
        }}
        className="w-[100%] h-[100vh] flex flex-row justify-around items-center "
      >
        <div className="text-[#0B1D51]">
          <h1 className="font-bold text-5xl font-[Montserrat]">Welcome to</h1>
          <h1 className="font-bold text-9xl font-[Mitr] transform transition-all duration-900 hover:scale-103  hover:text-[#0B1D51] hover:drop-shadow-[0_0_50px_#7EEE98]">GRADE.</h1>
          <h1 className="font-bold text-5xl  font-[Montserrat]">
            " Your Grades, Your Growth "
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-4xl text-[#0B1D51] font-[Montserrat]">
            {" "}
            Admin Login
          </h1>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
          >
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Enter Your Email"
              className="bg-[#ececec] w-[100%] h-15 rounded-[8px] mt-15 drop-shadow-2xl p-5 focus:outline-[#0B1D51]"
              required
            />

            <input
              onChange={(e) => setpassword(e.target.value)}
              type="Password"
              placeholder="Enter Your Password"
              className="bg-[#ececec] w-[100%] h-15 rounded-[8px] mt-15 drop-shadow-2xl p-5 focus:outline-[#0B1D51]"
              required
            />
            <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-[60%] h-10 bg-[#0B1D51] text-white mt-15 rounded-[8px] hover:bg-blue-950 hover:cursor-pointer  font-[Montserrat]  transition-all duration-300
             hover:shadow-[0_0_20px_#0B1D51]"
            >
              Log in
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
