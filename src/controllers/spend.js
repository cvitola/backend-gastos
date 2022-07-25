//const spend = require("../models/spend");

const getAllSpends = (req,res,next) => {
    res.send({
        id: 1,
        gasto: "electrico",
        monto: 1250.55,
    });
}

const createSpend = (req,res,next) => {
    res.send("Gasto Creado");
}

module.exports = {
    getAllSpends,
    createSpend
}