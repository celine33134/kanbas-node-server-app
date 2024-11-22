import Database from "../Database/index.js"; // Assuming this is where quizzes are stored



// Create a new quiz
export function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: Date.now().toString() }; // Unique ID using timestamp
    Database.quizzes = [...Database.quizzes, newQuiz];
    return newQuiz;
}

// Delete a quiz by ID
export function deleteQuiz(quizId) {
    Database.quizzes = Database.quizzes.filter((quiz) => quiz._id !== quizId);
}


