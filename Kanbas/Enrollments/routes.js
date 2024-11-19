
import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // Enroll user into a course
    app.post("/api/courses/:courseId/enroll", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body; // Assume userId is passed in the body
        const newEnrollment = dao.enrollUser(courseId, userId);
        res.status(201).json(newEnrollment);
    });

    // Unroll user from a course
    app.delete("/api/courses/:courseId/unenroll", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body; // Assume userId is passed in the body
        dao.unenrollUser(courseId, userId);
        res.sendStatus(204); // No content on successful deletion
    });

    // Get enrollments for a specific course
    app.get("/api/courses/:courseId/enrollments", (req, res) => {
        const { courseId } = req.params;
        const enrollments = dao.findEnrollmentsForCourse(courseId);
        res.json(enrollments);
    });

    // Get enrollments for a specific user
    app.get("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        const enrollments = dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    });
}
