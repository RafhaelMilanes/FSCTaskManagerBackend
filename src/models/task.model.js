const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = model("Tasks", TaskSchema);
module.exports = TaskModel;
