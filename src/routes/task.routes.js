const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

// realizar o get na rota "/"
router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

// rota para buscar
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

// realizar o post para criar uma task
router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

// rota para atualizat uma task
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
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
