const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.djrn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log("Conectado ao MongoDB!");
    } catch (error) {
        console.error("Erro de conexão ao MongoDB:", error);
    }
};

module.exports = connectToDatabase;
