const express = require("express");
const taskRoutes = require("./Tasks/routes/TaskRoutes");

const app = express();
app.use(express.json());

// 👇 tests expect /tasks
app.use("/tasks", taskRoutes);

// IMPORTANT for tests
if (require.main === module) {
    app.listen(8081, () => {
        console.log("Server running on port 8081");
    });
}

module.exports = app;
