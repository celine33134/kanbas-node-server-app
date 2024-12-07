import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import mongoose from "mongoose";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import "dotenv/config";


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
const app = express()

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    }
));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);

// app.listen(process.env.PORT || 4000)
app.listen(process.env.PORT || 4000, () => {
    console.log("Server is running on port", process.env.PORT || 4000);
});