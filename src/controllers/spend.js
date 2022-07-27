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
    try{
        if(req.body.date === "") {
            res.statusCode = 400;
            res.send("Field date is empty.")
            console.log("Field Date cannot be empty")
        }
        if(req.body.category === "") {
            res.statusCode = 400;
            res.send("Field category is empty.")
            console.log("Field Category cannot be empty")
        }
        if(req.body.amount === "") {
            res.statusCode = 400;
            res.send("Field amount is empty.")
            console.log("Field Amount cannot be empty")
        }
        res.send(req)
       /* if(res.statusCode != 400) {
            const newSpend = await spend.createSpend(req.body.date, req.body.type, req.body.amount);
            res.send(newSpend)
        }*/
    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.send(error.message)
        throw new Error(error)  
    }



}

module.exports = {
    getAllSpends,
    createSpend
}