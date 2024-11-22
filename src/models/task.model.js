const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
    description: {
        type: String,
        require: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Tasks", TaskSchema);
module.export = TaskModel;
