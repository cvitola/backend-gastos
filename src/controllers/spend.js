const spend = require("../models/spend");


const getAllSpends = async (req,res,next) => {
    try{
        const allSpends = await spend.getAllSpends();
        res.send(allSpends)
    }
    catch(error){
        res.statusCode = 500;
        res.send(error)
    }
}

const createSpend = async (req,res,next) => {
    console.log("Creating data: ", req.body);

    //validar que venga con los 3 campos
    if(req.body.date === ""){
        res.statusCode = 400;
        res.send("La fecha no puede ser vacía");
    }else if(req.body.category === ""){
        res.statusCode = 400;
        res.send("La categoria no puede ser vacío");
    }else if(req.body.amount === ""){
        res.statusCode = 400;
        res.send("El importe no puede ser vacío");
    }
    else{
        try{
            console.log("Estoy aca dentro del Try ")
            const newSpend = await spend.createSpend(req.body.date, req.body.category, req.body.amount);
            res.send(newSpend)
        } catch(err){
            console.log(err);
            res.statusCode = 500;
            res.send(err.message);
            }     
        }
}

module.exports = {
    getAllSpends,
    createSpend
}