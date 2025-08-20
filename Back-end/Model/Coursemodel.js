import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  course: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" } 
});

const COURSE = mongoose.model("Course", courseSchema);
export default COURSE;
