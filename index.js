//importando o express
const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
//inicializando o express
const app = express();
app.use(express.json());

connectToDatabase();

// realizar o get na rota "/"
app.get("/tasks", async (req, res) => {
    try {
        // Buscando as tasks no banco de dados
        const tasks = await TaskModel.find({});
        // Respondendo com as tasks encontradas
        res.status(200).send(tasks);
    } catch (error) {
        // Se ocorrer algum erro, responder com erro
        res.status(500).send({ message: "Erro ao buscar tarefas", error });
    }
});

// rota para buscar
app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("Task não encontrada.");
        }
        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// realizar o post para criar uma task
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// realizar o delete para excluir uma task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);

        if (!deletedTask) {
            return res.status(404).send("Task não encontrada!");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
