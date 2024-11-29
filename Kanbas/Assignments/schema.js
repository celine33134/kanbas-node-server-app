
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        dueDate: Date,
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" }, // Reference to Course model
    },
    { collection: "assignments" }
);

export default assignmentSchema;
