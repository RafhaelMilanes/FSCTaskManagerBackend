//importando o express
const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
//inicializando o express
const app = express();

connectToDatabase();

// ao realizar o get na rota "/"
app.get("/", (req, res) => {
    const tasks = [{ description: "Estudar Programação", isCompleted: false }];
    // ao realizar o get na rota, erá respondido o res
    res.status(200).send(tasks);
});

app.listen(8000, () => {
    console.log("Listening on port 8000!");
});
