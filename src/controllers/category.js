const category = require("../models/category");

const getAllCategories = async (req,res,next) => {
    try{
        const allCategories = await category.getAllSCategories();
        res.send(allCategories)
    }
    catch(error){
        res.statusCode = 500;
        res.send(error)
    }
}

const createCategory = async (req,res,next) => {
    console.log("Creating data: ", req.body);
    if(req.body.category === "") {
        res.statusCode = 400;
        res.send("Field Category is empty.");
        console.log("The field Category is mandatory");
    }
    else{
        try {
            const data = req.body.category.toUpperCase();
            console.log(data)
            const newCategory = await category.createCategory(data);
            res.send(newCategory)
        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.send(error.message)
            } 
    }

}

module.exports = {
    getAllCategories,
    createCategory
}