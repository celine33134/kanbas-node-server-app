import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
const RequestBody = require('./RequestBody.js');
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import cors from "cors";


export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
        res.send("Welcome to Lab 5");
    });

    PathParameters(app);
    QueryParameters(app);
    RequestBody(app);
    WorkingWithObjects(app);
    WorkingWithArrays(app);

};

