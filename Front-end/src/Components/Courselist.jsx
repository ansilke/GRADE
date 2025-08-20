import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";

function Courselist() {
  const [openaddModal, setopenaddModal] = useState(false);
  const [openeditModal, setopeneditModal] = useState(false);
  const [openviewModal, setopenviewModal] = useState(false);
  const [openbatchModal, setopenbatchModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [newCourse, setNewCourse] = useState("");
  const [courses, setCourses] = useState([]);

  const Handleaddcoursesubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2999/admin/createcourse", {
        course: newCourse,
      });
      setNewCourse("");
      fetchCourse();
      setopenaddModal(false);

      Swal.fire({
        icon: "success",
        title: "Course Added!",
        text: "The course has been added successfully.",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding Course", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Course",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get("http://localhost:2999/admin/getcourse");
      setCourses(response.data.data);
    } catch (error) {
      console.error("failed to fetch courses", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleeditcoursesubmit = async (e) => {
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
        await axios.put(
          `http://localhost:2999/admin/updatecourse/${selectedCourse._id}`,
          { course: selectedCourse.course }
        );
        fetchCourse();
        setopeneditModal(false);

        Swal.fire("Course Updated!", "", "success");
      } catch (error) {
        console.error("Error updating course:", error);
        Swal.fire("Error!", "Failed to update course", "error");
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };




  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/daadrhhk9/image/upload/v1753778107/Admin-Dashbord_mco6xg.png)",
          backgroundSize: "100% 100%",
        }}
        className="w-full h-[100vh] flex flex-row justify-center"
      >
        <Dashboard />

        <div className=" p-6 w-full drop-shadow-2xl">
          {/* Top Bar */}
          <div className="flex justify-between items-center mt-4 ">
            <div className="flex flex-col gap-y-5 relative">
              <h2 className="font-bold text-xl text-[#0B1D51] font-[Montserrat]">
                Course List
              </h2>
              <input
                type="text"
                placeholder="Search..."
                className="w-[400px] border rounded-full pl-10 pr-4 py-2 focus:outline-[#0B1D51] bg-gray-400/20"
              />
              <span className="absolute left-3 top-14 text-gray-500">🔍</span>
            </div>
            <button
              onClick={() => setopenaddModal(true)}
              className="bg-[#0B1D51] text-white px-6 py-2 rounded-[8px] font-[Montserrat] transition-all duration-500
             hover:shadow-[0_0_20px_#0B1D51] hover:curser-pointer"
            >
              Add Course
            </button>
          </div>

          {/* Course Table */}
          <div className="overflow-x-auto rounded-xl drop-shadow-2xl mt-8 font-[Montserrat]">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="min-w-full bg-white/70 ">
                <thead className="bg-[#57CC9B] text-black h-20 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-center">No</th>
                    <th className="py-3 px-4 text-left">Course</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-28 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((Course, index) => (
                    <tr
                      key={Course._id}
                      className="border-b hover:bg-white/50 transform transition-all duration-300 hover:scale-99"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3 text-left">{Course.course}</td>
                      <td className="px-4 py-3 text-left">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            Course.status === "Active"
                              ? "bg-green-500/80"
                              : "bg-red-500/80"
                          }`}
                        >
                          {Course.status || "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-3 flex gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setopeneditModal(true);
                            setSelectedCourse(Course);
                          }}
                          className="bg-[#0B1D51] text-white px-5 py-1 rounded font-[Montserrat] transition-all duration-100
      hover:shadow-[0_0_10px_#0B1D51] hover:cursor-pointer"
                        >
                          Edit
                        </button>

                        {/* Toggle Status Button */}
                        <button
                          onClick={async () => {
                            try {
                              await axios.put(
                                `http://localhost:2999/admin/course/status/${Course._id}`
                              );
                              fetchCourse(); // refresh list
                              Swal.fire("Success", "Course status updated!", "success");
                            } catch (error) {
                           console.error("Error toggling status", error);
                                 Swal.fire("Error", "Failed to update status", "error");
                            }
                          }}
                          className={`px-5 py-1 rounded text-sm  flex justify-center items-center w-24 font-[Montserrat] text-white transition-all duration-300 
      ${
        Course.status === "Active"
          ? "bg-red-500 hover:shadow-[0_0_20px_#FF0000]"
          : "bg-green-500 hover:shadow-[0_0_20px_#00FF3B]"
      }`}
                        >
                          {Course.status === "Active" ? "Inactive" : "Active"}
                        </button>

                        {/* View Button */}
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

      {/* ---------- Add Course Modal ---------- */}
      {openaddModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
            <form onSubmit={(e) => Handleaddcoursesubmit(e)}>
              <h2 className="text-xl font-bold mb-4 font-[Montserrat]">
                Add Course
              </h2>
              <hr className="mb-20  h-0.5 border bg-[#0B1D51]" />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51] mb-4">
                Course Name
              </h1>
              <input
                onChange={(e) => setNewCourse(e.target.value)}
                value={newCourse}
                required
                type="text"
                placeholder="Course Name"
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="submit"
                className="bg-[#0B1D51] text-white w-full py-2 rounded mt-20  transition-all duration-300
              hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer  font-[Montserrat]"
              >
                Save
              </button>
            </form>
            <button
              onClick={() => setopenaddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖️
            </button>
          </div>
        </div>
      )}

      {/* ---------- Edit Course Modal ---------- */}
      {openeditModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
            <form onSubmit={(e) => handleeditcoursesubmit(e)}>
              <h2 className="text-xl font-bold mb-4 font-[Montserrat]">
                Edit Course
              </h2>
              <hr className="mb-20  h-0.5 border bg-[#0B1D51]" />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51] mb-4">
                Course Name
              </h1>
              <input
                type="text"
                value={selectedCourse.course || ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    course: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="submit"
                className="bg-[#0B1D51] text-white w-full py-2 rounded mt-20  transition-all duration-300
              hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer  font-[Montserrat]"
              >
                Update
              </button>
            </form>
            <button
              onClick={() => setopeneditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
      {/* ---------- View Course Modal ---------- */}
      {openviewModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
            <h2 className="text-xl font-bold mb-4 font-[Montserrat]">
              Course:
            </h2>
            <hr className="mb-20  h-0.5 border bg-[#0B1D51]" />
            <h3 className="font-semibold font-[Montserrat] mb-3">Batch List</h3>
            <ul className="list-disc ml-5 mb-4 font-[Montserrat]">
              <li>july-1</li>
              <li>june-23</li>
            </ul>
            <button
              onClick={() => setopenbatchModal(true)}
              type="submit"
              className="bg-[#0B1D51] text-white w-full py-2 rounded mt-20  transition-all duration-300
              hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer  font-[Montserrat]"
            >
              Add Batch
            </button>
            <button
              onClick={() => setopenviewModal(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* ---------- Add Batch Modal ---------- */}
      {openbatchModal && (
        <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
            <h2 className="text-xl font-bold mb-4 font-[Montserrat]">
              Add Batch
            </h2>
            <hr className="mb-20  h-0.5 border bg-[#0B1D51]" />
            <h1 className="font-bold font-[Montserrat] text-[#0B1D51] mb-4">
              Batch Name
            </h1>
            <input
              type="text"
              placeholder="Batch Name"
              className="w-full border px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-[#0B1D51] text-white w-full py-2 rounded mt-20  transition-all duration-300
              hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer  font-[Montserrat]"
            >
              Save Batch
            </button>
            <button
              onClick={() => setopenbatchModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Courselist;
