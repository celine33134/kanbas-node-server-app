// import Database from "../Database/index.js";
//
// // Retrieve all assignments for a specific course
// export function findAssignmentsForCourse(courseId) {
//     const { assignments } = Database;
//     return assignments.filter((assignment) => assignment.course === courseId);
// }
//
// // Create a new assignment
// export function createAssignment(assignment) {
//     const newAssignment = { ...assignment, _id: Date.now().toString() };
//     Database.assignments = [...Database.assignments, newAssignment];
//     return newAssignment;
// }
//
// // Delete an assignment by ID
// export function deleteAssignment(assignmentId) {
//     Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
// }
//
// // Update an assignment by ID
// export function updateAssignment(assignmentId, assignmentUpdates) {
//     const assignment = Database.assignments.find((a) => a._id === assignmentId);
//     if (assignment) Object.assign(assignment, assignmentUpdates);
//     return assignment;
// }

import model from "./model.js";

// Retrieve all assignments for a specific course
export function findAssignmentsForCourse(courseId) {
    return model.find({ courseId }); // Use Mongoose `find` method to retrieve assignments by courseId
}

// Create a new assignment
export function createAssignment(assignment) {
    delete assignment._id; // Remove _id to allow MongoDB to auto-generate it
    return model.create(assignment); // Use Mongoose `create` method to insert the new assignment
}

// Delete an assignment by ID
export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId }); // Use Mongoose `deleteOne` method to delete the assignment
}

// Update an assignment by ID
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates }); // Use Mongoose `updateOne` to update the assignment
}
