const errosGeneral = (res) => {
    return res
        .status(500)
        .send("Um ou mais campos inseridos não são editaveis.");
};

module.exports = { errosGeneral };
