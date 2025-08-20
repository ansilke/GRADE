import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import Swal from "sweetalert2";

function Studentlist() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [count, setcount] = useState(0);
  const [selectedemail, setselectedemail] = useState("");

  const [editstudent, seteditstudent] = useState("");

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Number, setNumber] = useState("");
  const [Course, setCourse] = useState("");
  const [Batch, setBatch] = useState("");
  const [AdmissionNo, setAdmissionNo] = useState("");
  const [Password, setPassword] = useState("");
  const [Status, setStatus] = useState("");

  const [students, setstudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2999/admin/getstudent"
      );
      console.log(response);

      setstudents(response.data.data);
    } catch (error) {
      console.error("failed to fetch students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const Handleeditsubmit = async (e) => {
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
          "http://localhost:2999/admin/editstudent",
          {
            name: selectedStudent.name,
            email: selectedStudent.email,
            number: selectedStudent.number,
            course: selectedStudent.course,
            batch: selectedStudent.batch,
            admission: selectedStudent.admission,
            selectedemail: selectedemail,
          }
        );

        if (response.data) {
          const newcount = count + 1;
          setcount(newcount);
          setIsEditModalOpen(false);
          seteditstudent(newcount);
          fetchStudents();

          Swal.fire("Student Updated!", "", "success");
        } else {
          Swal.fire("Error!", "Failed to update student", "error");
        }
      } catch (error) {
        console.log("error in edit student", error);
        Swal.fire("Error!", "Something went wrong", "error");
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  const Handleaddsubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2999/admin/createstudent", {
        Name,
        Email,
        Number,
        Course,
        Batch,
        AdmissionNo,
        Password,
      });

      setName("");
      setEmail("");
      setNumber("");
      setCourse("");
      setBatch("");
      setAdmissionNo("");
      setPassword("");

      fetchStudents();

      setIsAddModalOpen(false);

      Swal.fire({
        icon: "success",
        title: "Student Added!",
        text: "The student has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding student", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Student",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:2999/admin/student/status/${id}`
      );
      if (response.data.success) {
        fetchStudents(); // refresh list
        Swal.fire("Success", "Student status updated!", "success");
      }
    } catch (error) {
      console.error("Error toggling status", error);
      Swal.fire("Error", "Failed to update status", "error");
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

        <div className="p-6 w-full  flex flex-col drop-shadow-2xl">
          <div className="flex  justify-between items-center mt-4">
            <div className="flex flex-col gap-y-5 relative">
              <h1 className="font-bold text-xl text-[#0B1D51] font-[Montserrat]">
                Students List
              </h1>
              <input
                type="text"
                placeholder="Search..."
                className="w-[400px] border rounded-full pl-10 pr-4 py-2 focus:outline-[#0B1D51] bg-gray-400/20"
              />
              <span className="absolute left-3 top-14 text-gray-500">🔍</span>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#0B1D51] text-white px-6 py-2 rounded-[8px]  font-[Montserrat] transition-all duration-500
             hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer"
            >
              Add Student
            </button>
          </div>

          <div className=" overflow-x-auto rounded-lg drop-shadow-2xl mt-8 font-[Montserrat] ">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="min-w-full bg-white/70 ">
                <thead className=" bg-[#57CC9B] text-black h-20 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-center">No</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Number</th>
                    <th className="py-3 px-4 text-left">Courses</th>
                    <th className="py-3 px-4 text-left">Batch</th>
                    <th className="py-3 px-4 text-center">Admission NO</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-27 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-b hover:bg-white/50  transform transition-all duration-500 hover:scale-99"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 ">
                        {student.name}
                      </td>
                      <td className="px-4 py-3 ">{student.email}</td>
                      <td className="px-4 py-3 ">{student.number}</td>
                      <td className="px-4 py-3 ">{student.course}</td>
                      <td className="px-4 py-3 ">{student.batch}</td>
                      <td className="px-4 py-3 ">{student.admission}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1  rounded-full text-white ${
                            student.status === "Active"
                              ? "bg-green-500/80"
                              : "bg-red-500/80 "
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsEditModalOpen(true);
                            setSelectedStudent(student);
                            setselectedemail(student.email);
                          }}
                          className="bg-[#0B1D51] text-white px-5 py-1 rounded transition-all duration-500
             hover:shadow-[0_0_20px_#0B1D51]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleStatus(student._id)}
                          className={`px-5 py-1 rounded flex justify-center items-center text-sm w-20 text-white ${
                            student.status === "Active"
                              ? "bg-red-500 transition-all duration-500 hover:shadow-[0_0_20px_#FF0000] "
                              : "bg-green-500 transition-all duration-500 hover:shadow-[0_0_20px_#00FF00]"
                          }`}
                        >
                          {student.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                        <button
                          onClick={() => setopenviewModal(true)}
                          className="bg-blue-500 text-white px-5 py-1 rounded w-20  transition-all duration-500 hover:shadow-[0_0_20px_#009CFF]"
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
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-gray-500  hover:cursor-pointer"
            >
              ✖️
            </button>

            <h2 className="text-lg font-bold mb-4 font-[Montserrat] text-[#0B1D51]">
              Add Student
            </h2>
            <hr className="mb-5  h-0.5 border bg-[#0B1D51]" />

            <form
              onSubmit={(e) => Handleaddsubmit(e)}
              className="flex flex-col gap-1"
            >
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Name
              </h1>
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                required
                onChange={(e) => setName(e.target.value)}
                value={Name}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Email
              </h1>
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Number
              </h1>
              <input
                type="text"
                placeholder="Number"
                className="border p-2 rounded"
                required
                onChange={(e) => setNumber(e.target.value)}
                value={Number}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Course
              </h1>
              <input
                type="text"
                placeholder="Course"
                className="border p-2 rounded"
                required
                onChange={(e) => setCourse(e.target.value)}
                value={Course}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Batch
              </h1>
              <input
                type="text"
                placeholder="Batch"
                className="border p-2 rounded"
                required
                onChange={(e) => setBatch(e.target.value)}
                value={Batch}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Admission No
              </h1>
              <input
                type="text"
                placeholder="Admission No"
                className="border p-2 rounded"
                required
                onChange={(e) => setAdmissionNo(e.target.value)}
                value={AdmissionNo}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Password
              </h1>
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
              />

              <button
                type="submit"
                className="bg-[#0B1D51] text-white py-2  rounded mt-7  transition-all duration-300
             hover:shadow-[0_0_20px_#0B1D51] hover:cursor-pointer font-[Montserrat]"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 text-gray-500  hover:cursor-pointer"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 font-[Montserrat] text-[#0B1D51]">
              Edit Student
            </h2>
            <hr className="mb-5  h-0.5 border bg-[#0B1D51]" />

            <form
              onSubmit={(e) => Handleeditsubmit(e)}
              className="flex flex-col gap-1"
            >
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Name
              </h1>
              <input
                required
                type="text"
                placeholder="Name"
                value={selectedStudent.name || ""}
                className="border p-2 rounded"
                onChange={(e) => {
                  setSelectedStudent({
                    ...selectedStudent,
                    name: e.target.value,
                  });
                }}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Email
              </h1>
              <input
                required
                type="email"
                placeholder="Email"
                value={selectedStudent.email || ""}
                className="border p-2 rounded"
                onChange={(e) => {
                  setSelectedStudent({
                    ...selectedStudent,
                    email: e.target.value,
                  });
                }}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Number
              </h1>
              <input
                required
                type="text"
                placeholder="Number"
                value={selectedStudent.number || ""}
                className="border p-2 rounded"
                onChange={(e) => {
                  setSelectedStudent({
                    ...selectedStudent,
                    number: e.target.value,
                  });
                }}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Course
              </h1>
              <input
                required
                type="text"
                placeholder="Course"
                value={selectedStudent.course || ""}
                className="border p-2 rounded"
                onChange={(e) => {
                  setSelectedStudent({
                    ...selectedStudent,
                    course: e.target.value,
                  });
                }}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Batch
              </h1>
              <input
                required
                type="text"
                placeholder="Batch"
                value={selectedStudent.batch || ""}
                className="border p-2 rounded"
                onChange={(e) => {
                  setSelectedStudent({
                    ...selectedStudent,
                    batch: e.target.value,
                  });
                }}
              />
              <h1 className="font-bold font-[Montserrat] text-[#0B1D51]">
                Admission No
              </h1>
              <input
                required
                type="text"
                placeholder="Admission No"
                value={selectedStudent.admission || ""}
                className="border p-2 rounded"
                onChange={(e) => {
                  setSelectedStudent({
                    ...selectedStudent,
                    admission: e.target.value,
                  });
                }}
              />

              <button
                type="submit"
                className="bg-[#0B1D51] text-white py-2 rounded mt-7 transition-all duration-300
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

export default Studentlist;
