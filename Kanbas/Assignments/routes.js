import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    // Retrieve all assignments for a specific course
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    // Create a new assignment
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = { ...req.body, course: courseId };
        const newAssignment = assignmentsDao.createAssignment(assignment);
        res.json(newAssignment);
    });

    // Delete an assignment
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        assignmentsDao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    });

    // Update an assignment
    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        res.sendStatus(204);
    });
}
