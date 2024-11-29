// import * as assignmentsDao from "./dao.js";
//
// export default function AssignmentRoutes(app) {
//     // Retrieve all assignments for a specific course
//     app.get("/api/courses/:courseId/assignments", (req, res) => {
//         const { courseId } = req.params;
//         const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
//         res.json(assignments);
//     });
//
//     // Create a new assignment
//     app.post("/api/courses/:courseId/assignments", (req, res) => {
//         const { courseId } = req.params;
//         const assignment = { ...req.body, course: courseId };
//         const newAssignment = assignmentsDao.createAssignment(assignment);
//         res.json(newAssignment);
//     });
//
//     // Delete an assignment
//     app.delete("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         assignmentsDao.deleteAssignment(assignmentId);
//         res.sendStatus(204);
//     });
//
//     // Update an assignment
//     app.put("/api/assignments/:assignmentId", (req, res) => {
//         const { assignmentId } = req.params;
//         const assignmentUpdates = req.body;
//         assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
//         res.sendStatus(204);
//     });
// }

import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Retrieve all assignments for a specific course
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        try {
            const { courseId } = req.params;
            const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ error: "Error retrieving assignments" });
        }
    });

    // Create a new assignment
    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        try {
            const { courseId } = req.params;
            const assignment = { ...req.body, courseId }; // Include courseId in the new assignment
            const newAssignment = await assignmentsDao.createAssignment(assignment);
            res.json(newAssignment);
        } catch (error) {
            res.status(500).json({ error: "Error creating assignment" });
        }
    });

    // Delete an assignment
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        try {
            const { assignmentId } = req.params;
            await assignmentsDao.deleteAssignment(assignmentId); // Call DAO to delete the assignment
            res.sendStatus(204); // Send a 204 status code for successful deletion
        } catch (error) {
            res.status(500).json({ error: "Error deleting assignment" });
        }
    });

    // Update an assignment
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const assignmentUpdates = req.body; // Get the assignment updates from the request body
            await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates); // Call DAO to update the assignment
            res.sendStatus(204); // Send a 204 status code for successful update
        } catch (error) {
            res.status(500).json({ error: "Error updating assignment" });
        }
    });
}
