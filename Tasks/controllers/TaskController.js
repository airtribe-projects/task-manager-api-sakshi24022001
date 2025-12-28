const tasks = require("../models/task");

// POST /tasks
const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
};

// GET /tasks
const getAllTasks = async (req, res) => {
    res.status(200).json(tasks);
};

// GET /tasks/:id
const getTaskById = async (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
};

// PUT /tasks/:id
const updateTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    const { title, description, completed } = req.body;

    if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof completed !== "boolean"
    ) {
        return res.status(400).json({ error: "Invalid data" });
    }

    task.title = title;
    task.description = description;
    task.completed = completed;

    res.status(200).json(task);
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted" });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
