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

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
