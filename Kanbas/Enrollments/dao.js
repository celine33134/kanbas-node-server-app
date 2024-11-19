
import Database from "../Database/index.js";

// Helper function to find enrollments by a specific field (user or course)
function findEnrollmentsByField(field, value) {
    return Database.enrollments.filter(enrollment => enrollment[field] === value);
}

export function findEnrollmentsForUser(userId) {
    // Find all enrollments for the given userId
    return findEnrollmentsByField("user", userId);
}

export function findEnrollmentsForCourse(courseId) {
    // Find all enrollments for the given courseId
    return findEnrollmentsByField("course", courseId);
}

// export function enrollUser(courseId, userId) {
//     const newEnrollment = { _id: Date.now(), user: userId, course: courseId };
//     Database.enrollments.push(newEnrollment);
//     return newEnrollment; // Return the newly created enrollment
// }
export function enrollUser(courseId, userId) {
    const newEnrollment = {
        _id: String(Date.now()), // Generate string ID
        user: String(userId),    // Ensure userId is a string
        course: String(courseId) // Ensure courseId is a string
    };
    Database.push(newEnrollment); // Assuming Database is an array like in enrollment.js
    return newEnrollment;
}

export function unenrollUser(courseId, userId) {
    // Find the enrollment by courseId and userId
    const index = Database.enrollments.findIndex(
        enrollment => enrollment.course === courseId && enrollment.user === userId
    );

    if (index !== -1) {
        // Remove the enrollment from the array
        Database.enrollments.splice(index, 1);
        return true; // Return true to indicate successful unenrollment
    }
    return false; // Return false if no enrollment found to remove
}

// export function enrollUserInCourse(userId, courseId) {
//     const { enrollments } = Database;
//     enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }

