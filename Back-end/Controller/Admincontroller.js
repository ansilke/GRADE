import COURSE from "../Model/Coursemodel.js";
import Mentor from "../Model/Mentormodel.js";
import Student from "../Model/Studentmodel.js";


const adminemail="admin@gmail.com"
const adminpassword="987654321"

const checkadmin=(req,res)=>{
    console.log(req.body);
    const {email,Password}=req.body
    
    
    

    if (email==adminemail && Password==adminpassword){
        res.send("done")
    }else{
        res.send("invalied cridentials") 
    }
}


export
const creatementor = async (req, res) =>{

    try{
        const { name, email, number, course, password } = req.body;
        console.log(req.body);
        
        if(!name ||  !email || !number || !course || !password) {
            return res.status(400).json({ msg: "All fleids are required"});
        }

        const existingUser = await Mentor.findOne({email});
        if (existingUser){
            return res.status(400).json({msg: "user allready exist"});
        }


        const newMentor = new Mentor ({name, email, number, course });
        await newMentor.save();

        return res.status(200).json({msg: "mentor created succsessfully", mentor: newMentor});
    }catch (error) {
        console.log("error in creeate mentor", error);
        return res.status(500).json({succsess: false, massage:"server error"});
        
    }
};




const getmentor = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    
    res.status(200).json({
      success: true,
      data: mentors
    });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


const editmentor = async (req,res) =>{
    try {
        const {name, email, course, number, selectedemail} =req.body;

        const data = await Mentor. updateOne(
            { email:selectedemail},
            {
                $set: {
                    name:name,
                    email:email,
                    number:parseInt(number),
                    course:course
                }
            }
        );
        return res.send(data);
    } catch (error) {
        console.log("error", error);
        res.status(500).send({massage: "internal server error"});
    }
}

const createstudent= async (req, res)=>{
    try {
        const {Name,Email,Number,Course,Batch,AdmissionNo,Password}= req.body;
        console.log(req.body);

        if (!Name || !Email|| !Number|| !Course|| !Batch|| !AdmissionNo|| !Password){
            return res.status(400).json({ msg: "All fields are required"});
        }

        const existingUser= await Student.findOne({Email});
        if (existingUser){
            return res.status(400).json({msg:"User allready exist"});
        }

        const newStudent = new Student ({name:Name, email:Email, number:Number, course:Course, batch:Batch, admission:AdmissionNo,password:Password});
        await newStudent.save();

        return res.status(200).json({msg:"Student created sucssesfully", Student: newStudent});
        
    } catch (error) {
        console.log("error in creeate student", error);
        return res.status(500).json({succsess: false, massage:"server error"}); 
    }
}

const getstudent = async (req,res) => {
    try {
        
        
        const students = await Student.find();

        res.status(200).json({
            succsess: true,
            data: students
        });

    } catch (error) {
        console.error("Error fetching mentors:", error);
        res.status(500).json({
          success: false,
          message: "Server error"
        });
    }
}

const editstudent = async (req,res) =>{

    
    try {
        const {name, email, course, number, batch, admission,selectedemail}=req.body;

        const data = await Student. updateOne(
            {email:selectedemail},
            {
                $set: {
                    name:name,
                    email:email,
                    number:number,
                    course:course,
                    batch:batch,
                    admission:admission
                }
            }
        );
        return res.send(data);

    } catch (error) {
        console.log("error", error);
        res.status(500).send({massage: "internal server error"});
    }
}


const createcourse = async (req, res) => {
    try {
      const { course } = req.body;
      console.log(req.body);
  
      if (!course) {
        return res.status(400).json({ msg: "fields are required" });
      }
  
      const existingCourse = await COURSE.findOne({ course });  
      if (existingCourse) {
        return res.status(400).json({ msg: "course already exists" });
      }
  
      const newCourse = new COURSE({ course });
      await newCourse.save();
  
      return res.status(200).json({ msg: "course created successfully", course: newCourse });
  
    } catch (error) {
      console.log("error in create course", error);
      return res.status(500).json({ success: false, message: "server error" });
    }
  };
  

const getcourse=async (req,res)=>{
    try {
        const course=await COURSE.find();

        res.status(200).json({
            succsess:true,
            data:course
        })

    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({
          success: false,
          message: "Server error"
        });
    }
}

export
const updatecourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { course } = req.body;
  
      if (!course) {
        return res.status(400).json({ msg: "Course name is required" });
      }
  
      const updatedCourse = await COURSE.findByIdAndUpdate(
        id,
        { course },
        { new: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({ msg: "Course not found" });
      }
  
      res.status(200).json({
        success: true,
        msg: "Course updated successfully",
        data: updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  const toggleStudentStatus = async (req, res) => {
    try {
      const { id } = req.params; // student id
      const student = await Student.findById(id);
  
      if (!student) {
        return res.status(404).json({ msg: "Student not found" });
      }
  
      // toggle status
      student.status = student.status === "Active" ? "Inactive" : "Active";
      await student.save();
  
      res.status(200).json({
        success: true,
        msg: "Status updated successfully",
        data: student,
      });
    } catch (error) {
      console.error("Error toggling status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  const toggleMentorStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const mentor = await Mentor.findById(id);
  
      if (!mentor) {
        return res.status(404).json({ msg: "Mentor not found" });
      }
  
      mentor.status = mentor.status === "Active" ? "Inactive" : "Active";
      await mentor.save();
  
      res.status(200).json({
        success: true,
        msg: "Mentor status updated successfully",
        data: mentor,
      });
    } catch (error) {
      console.error("Error toggling mentor status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  const toggleCourseStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const course = await COURSE.findById(id);
  
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }
  
      // default status = Active if not set
      if (!course.status) course.status = "Active";
  
      // toggle
      course.status = course.status === "Active" ? "Inactive" : "Active";
      await course.save();
  
      res.status(200).json({
        success: true,
        msg: "Course status updated successfully",
        data: course,
      });
    } catch (error) {
      console.error("Error toggling course status:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  export  {
    checkadmin,
    getmentor,
    editmentor,
    createstudent,
    getstudent,
    editstudent,
    createcourse,
    getcourse,
    toggleStudentStatus,
    toggleMentorStatus,
    toggleCourseStatus, 
  };
  