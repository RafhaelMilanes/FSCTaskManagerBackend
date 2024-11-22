//importando o express
const express = require("express");
const dotenv = require("dotenv");
const TaskRouter = require("./src/routes/task.routes");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
//inicializando o express
const app = express();
app.use(express.json());

connectToDatabase();
app.use("/tasks", TaskRouter);

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
