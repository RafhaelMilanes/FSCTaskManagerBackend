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
    return new TaskController(req, res).delete();
});

module.exports = router;
