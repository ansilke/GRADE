import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  course: String,
  password: String,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Inactive"
  }
});

export default mongoose.model("Mentor", mentorSchema);
