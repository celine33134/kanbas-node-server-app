//
// import * as dao from "./dao.js";
//
// export default function EnrollmentRoutes(app) {
//     // Enroll user into a course
//     app.post("/api/courses/:courseId/enroll", (req, res) => {
//         const { courseId } = req.params;
//         const { userId } = req.body; // Assume userId is passed in the body
//         const newEnrollment = dao.enrollUser(courseId, userId);
//         res.status(201).json(newEnrollment);
//     });
//
//     // Unroll user from a course
//     app.delete("/api/courses/:courseId/unenroll", (req, res) => {
//         const { courseId } = req.params;
//         const { userId } = req.body; // Assume userId is passed in the body
//         dao.unenrollUser(courseId, userId);
//         res.sendStatus(204); // No content on successful deletion
//     });
//
//     // Get enrollments for a specific course
//     app.get("/api/courses/:courseId/enrollments", (req, res) => {
//         const { courseId } = req.params;
//         const enrollments = dao.findEnrollmentsForCourse(courseId);
//         res.json(enrollments);
//     });
//
//     // Get enrollments for a specific user
//     app.get("/api/users/:userId/enrollments", (req, res) => {
//         const { userId } = req.params;
//         const enrollments = dao.findEnrollmentsForUser(userId);
//         res.json(enrollments);
//     });
// }

import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // Enroll user into a course
    app.post("/api/courses/:courseId/enroll", async (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body; // Assume userId is passed in the body
        const newEnrollment = await dao.enrollUserInCourse(userId, courseId); // MongoDB logic
        res.status(201).json(newEnrollment); // Return the new enrollment
    });

    // Unenroll user from a course
    app.delete("/api/courses/:courseId/unenroll", async (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body; // Assume userId is passed in the body
        const status = await dao.unenrollUserFromCourse(userId, courseId); // MongoDB logic
        if (status.deletedCount > 0) {
            res.sendStatus(204); // No content on successful deletion
        } else {
            res.status(404).json({ message: "Enrollment not found" }); // Handle not found
        }
    });

    // Get enrollments for a specific course
    app.get("/api/courses/:courseId/enrollments", async (req, res) => {
        const { courseId } = req.params;
        const enrollments = await dao.findUsersForCourse(courseId); // MongoDB logic
        res.json(enrollments); // Return users enrolled in the course
    });

    // Get enrollments for a specific user
    app.get("/api/users/:userId/enrollments", async (req, res) => {
        const { userId } = req.params;
        const enrollments = await dao.findCoursesForUser(userId); // MongoDB logic
        res.json(enrollments); // Return courses the user is enrolled in
    });
}
