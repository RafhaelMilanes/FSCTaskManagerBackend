const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
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
}

module.exports = TaskController;
