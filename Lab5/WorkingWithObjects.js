

const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const module = {
    id: 1,
    name: "Web Development",
    description: "Full Stack Web Development with React and Node.js",
    course: "CS101",
};

export default function WorkingWithObjects(app) {
    // Route for getting the assignment object
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    // Route for getting the title of the assignment
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    // Route for updating the assignment title
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    // Route for getting the module object
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });

    // Route for getting the name of the module
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });

    // Route for updating the module name
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });

    // Route for updating the module description
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });

    // Routes to update assignment score and completion status
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });

    app.get("/lab5/assignment/completed/:status", (req, res) => {
        const { status } = req.params;
        assignment.completed = status === "true";
        res.json(assignment);
    });
}

