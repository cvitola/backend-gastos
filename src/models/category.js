const getCollection = require("../utils/mongoDBClient").getCollection;

const getAllCategories = async () => {
    try{
        const categoryCollection = getCollection("categorias");
        const categories = await categoryCollection.find().toArray();
        return categories;
    }
    catch(error){
        console.log(error);
        throw new Error(error);
    }
}

const createCategory = async(category) => {
    try{
        const categoriesCollection = getCollection("categorias");
        const newCategory = await categoriesCollection.insertOne({
            category: category
        })
        return newCategory;
    }
    catch(error){
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    createCategory,
    getAllCategories
}