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

    if(req.body.date === ""){
        res.statusCode = 400;
        res.send("La fecha no puede ser vacía");
    }else if(req.body.category === ""){
        res.statusCode = 400;
        res.send("La categoria no puede ser vacío");
    }else if(req.body.amount === ""){
        res.statusCode = 400;
        res.send("El importe no puede ser vacío");
    }else if(req.body.userID === ""){
        res.status(400).json({message: "El usuario no puede ser vacío"})
    }
    else{
        try{
            console.log("Estoy aca dentro del Try ")
            const newSpend = await spend.createSpend(req.body.date, req.body.category, req.body.amount, req.body.userID);
            res.send(newSpend)
        } catch(err){
            console.log(err);
            res.statusCode = 500;
            res.send(err.message);
            }     
        }
}

const getSpendsByUser = async(req,res,next) => {

    if(req.body.userID === "") {
        res.status(400).json({message: "El usuario no puede ser vacío"});
    }else{
        try{
            
            const spendsByUser = await spend.getSpendsByUser(req.params.id);
            res.send(spendsByUser)
        }
        catch(error){
            res.statusCode = 500;
            res.send(error)
        }        
    }

}

const deleteSpend = async(req,res,next) => {
    if(req.params.id === "") { 
        res.statys(400).json({message: "No ha enviado el gasto a Eliminar."})
    } else {
        try{
            const deleteSpend = await spend.deleteSpend(req.params.id);
            res.send(deleteSpend);
        } catch(error){
            res.status(500).json({message: error})
        }
    }
}

module.exports = {
    getAllSpends,
    createSpend,
    getSpendsByUser,
    deleteSpend
}