const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();

// realizar o get na rota "/"
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// rota para atualizat uma task
router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        //pegou a tarefa
        const taskToUpdate = await TaskModel.findById(taskId);

        //campos que pode ser atualizado
        const allowedUpdates = ["isCompleted"];

        // capos que o usuario está tentando atualizar
        const requestedUpdate = Object.keys(req.body);

        // para cada campo recebido no body, verifica de o campo inclui o campo permitido
        for (update of requestedUpdate) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res.status(500).send("Campo não são editaveis");
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// realizar o delete para excluir uma task
router.delete("/:id", async (req, res) => {
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

module.exports = router;
