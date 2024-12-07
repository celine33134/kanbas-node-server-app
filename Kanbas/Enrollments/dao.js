//
// // import Database from "../Database/index.js";
// import model from "./model.js";
//
// export async function findCoursesForUser(userId) {
//     const enrollments = await model.find({ user: userId }).populate("course");
//     return enrollments.map((enrollment) => enrollment.course);
// }
// export async function findUsersForCourse(courseId) {
//     const enrollments = await model.find({ course: courseId }).populate("user");
//     return enrollments.map((enrollment) => enrollment.user);
// }
// export function enrollUserInCourse(user, course) {
//     return model.create({ user, course });
// }
// export function unenrollUserFromCourse(user, course) {
//     return model.deleteOne({ user, course });
// }
//
//
// // Helper function to find enrollments by a specific field (user or course)
// function findEnrollmentsByField(field, value) {
//     return Database.enrollments.filter(enrollment => enrollment[field] === value);
// }
//
// export function findEnrollmentsForUser(userId) {
//     // Find all enrollments for the given userId
//     return findEnrollmentsByField("user", userId);
// }
//
// export function findEnrollmentsForCourse(courseId) {
//     // Find all enrollments for the given courseId
//     return findEnrollmentsByField("course", courseId);
// }
//
// // export function enrollUser(courseId, userId) {
// //     const newEnrollment = { _id: Date.now(), user: userId, course: courseId };
// //     Database.enrollments.push(newEnrollment);
// //     return newEnrollment; // Return the newly created enrollment
// // }
// export function enrollUser(courseId, userId) {
//     const newEnrollment = {
//         _id: String(Date.now()), // Generate string ID
//         user: String(userId),    // Ensure userId is a string
//         course: String(courseId) // Ensure courseId is a string
//     };
//     Database.push(newEnrollment); // Assuming Database is an array like in enrollment.js
//     return newEnrollment;
// }
//
// export function unenrollUser(courseId, userId) {
//     // Find the enrollment by courseId and userId
//     const index = Database.enrollments.findIndex(
//         enrollment => enrollment.course === courseId && enrollment.user === userId
//     );
//
//     if (index !== -1) {
//         // Remove the enrollment from the array
//         Database.enrollments.splice(index, 1);
//         return true; // Return true to indicate successful unenrollment
//     }
//     return false; // Return false if no enrollment found to remove
// }
//
//
import model from "./model.js"; // Mongoose model

// Find all courses a user is enrolled in
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course"); // Populate course details
    return enrollments.map((enrollment) => enrollment.course); // Return courses
}

// Find all users enrolled in a specific course
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user"); // Populate user details
    return enrollments.map((enrollment) => enrollment.user); // Return users
}

// Enroll a user in a course
export async function enrollUserInCourse(userId, courseId) {
    const newEnrollment = await model.create({ user: userId, course: courseId });
    return newEnrollment; // Return the created enrollment
}

// Unenroll a user from a course
export async function unenrollUserFromCourse(userId, courseId) {
    const status = await model.deleteOne({ user: userId, course: courseId });
    return status; // Return the status of the deletion
}
