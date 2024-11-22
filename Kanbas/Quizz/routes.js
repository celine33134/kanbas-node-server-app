import * as quizzesDao from "./dao.js"; // Import DAO functions for quizzes

export default function QuizRoutes(app) {

    // Create a new quiz
    app.post("/api/courses/:courseId/quizzes", (req, res) => {
        const { courseId } = req.params;
        const quiz = { ...req.body, course: courseId }; // Add the courseId to the quiz
        const newQuiz = quizzesDao.createQuiz(quiz); // Create the quiz using the DAO
        res.status(201).json(newQuiz); // Return the new quiz with 201 Created status
    });

    // Delete a quiz by ID
    app.delete("/api/quizzes/:quizId", (req, res) => {
        const { quizId } = req.params;
        quizzesDao.deleteQuiz(quizId); // Delete the quiz using the DAO
        res.sendStatus(204); // Return 204 No Content status
    });


}
