const TaskModel = require("../models/task.model");
const { notFoundError, objectIdErros } = require("../errors/mongodb.errors");
const { errosGeneral } = require("../errors/general.erros");
const { default: mongoose } = require("mongoose");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            // Buscando as tasks no banco de dados
            const tasks = await TaskModel.find({});
            // Respondendo com as tasks encontradas
            this.res.status(200).send(tasks);
        } catch (error) {
            // Se ocorrer algum erro, responder com erro
            this.res
                .status(500)
                .send({ message: "Erro ao buscar tarefas", error });
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return notFoundError(this.res);
            }
            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdErros(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            //pegou a tarefa
            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            //campos que pode ser atualizado
            const allowedUpdates = ["isCompleted"];

            // capos que o usuario está tentando atualizar
            const requestedUpdate = Object.keys(this.req.body);

            // para cada campo recebido no body, verifica de o campo inclui o campo permitido
            for (const update of requestedUpdate) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return errosGeneral(this.res);
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdErros(this.res);
            }
            return this.res.status(500).send(error.message);
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdErros(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
