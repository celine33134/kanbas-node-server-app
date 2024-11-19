

let todos = [
    { id: 1, title: "Task 1", completed: false, description: "Description of Task 1" },
    { id: 2, title: "Task 2", completed: true, description: "Description of Task 2" },
    { id: 3, title: "Task 3", completed: false, description: "Description of Task 3" },
    { id: 4, title: "Task 4", completed: true, description: "Description of Task 4" },
];

export default function WorkingWithArrays(app) {
    // Retrieve all todos
    app.get("/lab5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedBool = completed === "true";
            const completedTodos = todos.filter((t) => t.completed === completedBool);
            return res.json(completedTodos);
        }
        res.json(todos);
    });

    // Retrieve a specific todo by ID
    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
    });

    // Create a new todo
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(), // Use timestamp as unique ID
            title: "New Task",
            completed: false,
            description: "New Task Description",
        };
        todos.push(newTodo);
        res.json(todos);
    });

    app.post("/lab5/todos", (req, res) => {
        const newTodo = { ...req.body,  id: new Date().getTime() };
        todos.push(newTodo);
        res.json(newTodo);
    });


    // Delete a todo by ID
    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos.splice(todoIndex, 1);
        res.json(todos);
    });
    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
        }
        todos.splice(todoIndex, 1);
        res.sendStatus(200);
    });


    // Update the title of a todo by ID
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.title = title;
        res.json(todos);
    });

    // Update the completed status of a todo by ID
    app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.completed = completed === "true";
        res.json(todos);
    });

    // Update the description of a todo by ID
    app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.description = description;
        res.json(todos);
    });

    app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
            return;
        }
        todos = todos.map((t) => {
            if (t.id === parseInt(id)) {
                return { ...t, ...req.body };
            }
            return t;
        });
        res.sendStatus(200);
    });

}
