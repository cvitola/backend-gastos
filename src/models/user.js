const getCollection = require("../utils/mongoDBClient").getCollection;

const createUser = async(data) => {
    try{
        const usersCollection = getCollection("users");
        const newUser = await usersCollection.insertOne(data);
        return newUser;
    } catch(error){
        console.log(error);
        throw new Error(error);
    }
}

const findUserByMail = async(email) => {
    console.log("Estoy aca....")
    try {
        return result = await getCollection("users").findOne({email:email})
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
module.exports = {
    createUser,
    findUserByMail
}