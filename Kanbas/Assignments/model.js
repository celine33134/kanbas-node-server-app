import mongoose from "mongoose";
import assignmentSchema from "./schema.js";

// Create a model based on the schema
const model = mongoose.model("AssignmentModel", assignmentSchema);

export default model;
