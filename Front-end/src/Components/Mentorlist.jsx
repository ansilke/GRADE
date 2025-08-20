import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";

function Mentorlist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedmentor, setselectedmentor] = useState({});
  const [count, setcount] = useState(0);
  const [selectedemail, setselectedemail] = useState("");

  const [editmentor, seteditmentor] = useState("");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [course, setcourse] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState("");

  const [mentors, setMentors] = useState([]);

  const fetchMentors = async () => {
    try {
      const response = await axios.get("http://localhost:2999/admin/getmentor");
      console.log(response);

      setMentors(response.data.data);
    } catch (error) {
      console.error("Failed to fetch mentors", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleeditsubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:2999/admin/editmentor",
          {
            name: selectedmentor.name,
            email: selectedmentor.email,
            number: selectedmentor.number,
            course: selectedmentor.course,
            selectedemail,
          }
        );

        if (response.data) {
          const newcount = count + 1;
          setcount(count + 1);
          setShowEditModal(false);
          seteditmentor(newcount);

          Swal.fire("Mentor Updated!", "", "success");
        } else {
          Swal.fire("Error!", "Failed to update student", "error");
        }
      } catch (error) {
        console.log("eroor in edit");
        Swal.fire("Error!", "Something went wrong", "error");
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  const Addsubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2999/admin/creatementor", {
        name: name,
        email: email,
        number: number,
        course: course,
        password: password,
      });

      setShowAddModal(false);
      setemail("");
      setname("");
      setnumber("");
      setcourse("");

      Swal.fire({
        icon: "success",
        title: "Mentor Added!",
        text: "The mentor has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding mentor", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Mentor",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleToggleMentorStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:2999/admin/mentor/status/${id}`
      );
      if (response.data.success) {
        fetchMentors(); // refresh table
        Swal.fire("Success", "Mentor status updated!", "success");
      }
    } catch (error) {
      console.error("Error toggling mentor status", error);
      Swal.fire("Error", "Failed to update mentor status", "error");
    }
  };

  return (
    <>
      <div
        className="flex flex-row w-full h-[100vh] justify-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/daadrhhk9/image/upload/v1753778107/Admin-Dashbord_mco6xg.png)",
          backgroundSize: "100% 100%",
        }}
      >
        <Dashboard />
        <div className="p-6 w-full drop-shadow-2xl">
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col gap-y-5 relative">
              <h2 className="font-bold text-xl text-[#0B1D51] font-[Montserrat] ">
                Mentors list
              </h2>
              <input
                type="text"
                placeholder="Search..."
                className="w-[400px] border rounded-full pl-10 pr-4 py-2 focus:outline-[#0B1D51] bg-gray-400/20"
              />
              <span className="absolute left-3 top-14 text-gray-500">🔍</span>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#0B1D51] text-white px-6 py-2 rounded-[8px]  font-[Montserrat] transition-all duration-500
             hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer"
            >
              Add Mentor
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg drop-shadow-2xl mt-8 font-[Montserrat]">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="min-w-full bg-white/70">
                <thead className="bg-[#57CC9B] text-black h-20 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-center">No</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Number</th>
                    <th className="py-3 px-4 text-left">Courses</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-27 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.map((mentor, index) => (
                    <tr
                      key={mentor.id}
                      className="border-b hover:bg-white/50  transform transition-all duration-500 hover:scale-99"
                    >
                      <td className="px-4 py-3 ">{index + 1}</td>
                      <td className="px-4 py-3 w-[150px] break-all">
                        {mentor.name}
                      </td>
                      <td className="px-4 py-3 ">{mentor.email}</td>
                      <td className="px-4 py-3 ">{mentor.number}</td>
                      <td className="px-4 py-3 ">{mentor.course}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            mentor.status === "Active"
                              ? "bg-green-500/80"
                              : "bg-red-500/80"
                          }`}
                        >
                          {mentor.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setShowEditModal(true);
                            setselectedmentor(mentor);
                            setselectedemail(mentor.email);
                          }}
                          className="bg-[#0B1D51] text-white px-5 py-1 rounded font-[Montserrat] transition-all duration-100
      hover:shadow-[0_0_10px_#0B1D51] hover:cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleToggleMentorStatus(mentor._id)}
                          className={`px-5 py-1 rounded  flex justify-center items-center  text-sm w-24 text-white ${
                            mentor.status === "Active"
                              ? "bg-red-500 hover:shadow-[0_0_10px_#FF0000]"
                              : "bg-green-500 hover:shadow-[0_0_10px_#00FF00]"
                          }`}
                        >
                          {mentor.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        <button
                          onClick={() => setopenviewModal(true)}
                          className="bg-blue-500 text-white px-5 py-1 rounded text-sm font-[Montserrat] transition-all duration-300
      hover:shadow-[0_0_20px_#009CFF]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[450px] relative">
            <form onSubmit={(e) => Addsubmit(e)}>
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4 text-[#0B1D51] font-[Montserrat]">
                  Add Mentor
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="ml-4 text-gray-600 mb-10 hover:cursor-pointer"
                >
                  ✖️
                </button>
              </div>
              <hr className="mb-5  h-0.5 border bg-[#0B1D51]" />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Name
              </h1>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Email
              </h1>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Number
              </h1>
              <input
                type="text"
                name="number"
                placeholder="Phone"
                value={number}
                onChange={(e) => setnumber(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Course
              </h1>
              <input
                type="text"
                name="course"
                placeholder="Course"
                value={course}
                onChange={(e) => setcourse(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Password
              </h1>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-[#0B1D51] text-white w-full py-2 rounded mt-7  transition-all duration-300
             hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer font-[Montserrat]"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[450px] relative">
            <form onSubmit={(e) => handleeditsubmit(e)}>
              <div className="flex flex-row justify-between items-center">
                <h2 className="text-xl font-semibold mb-4 text-[#0B1D51] font-[Montserrat]">
                  Edit Mentor
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="ml-4 mb-10 text-gray-600 hover:cursor-pointer"
                >
                  ✖️
                </button>
              </div>
              <hr className="mb-5  h-0.5 border bg-[#0B1D51]" />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Name
              </h1>
              <input
                value={selectedmentor.name || ""}
                onChange={(e) => {
                  setselectedmentor({
                    ...selectedmentor,
                    name: e.target.value,
                  });
                }}
                type="text"
                className="w-full border px-3 py-2 rounded-md mb-3"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Email
              </h1>
              <input
                value={selectedmentor.email || ""}
                onChange={(e) =>
                  setselectedmentor({
                    ...selectedmentor,
                    email: e.target.value,
                  })
                }
                type="email"
                className="w-full border px-3 py-2 rounded-md mb-3"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Number
              </h1>
              <input
                value={selectedmentor.number || ""}
                onChange={(e) =>
                  setselectedmentor({
                    ...selectedmentor,
                    number: e.target.value,
                  })
                }
                type="phone"
                className="w-full border px-3 py-2 rounded-md mb-3"
                required
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Course
              </h1>
              <input
                value={selectedmentor.course || ""}
                onChange={(e) =>
                  setselectedmentor({
                    ...selectedmentor,
                    course: e.target.value,
                  })
                }
                type="text"
                className="w-full border px-3 py-2 rounded-md mb-3"
                required
              />

              <button
                className="bg-[#0B1D51] text-white px-12 py-2 mt-7 rounded w-full  transition-all duration-300
             hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer  font-[Montserrat]"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Mentorlist;
