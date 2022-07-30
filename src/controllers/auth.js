const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const loginUser = () => {}

const registerUser = async(req,res,next) => {
    try {
        const userBody = req.body;
        console.log(userBody)
        if(userBody.name === ""){
            res.statusCode = 400;
            res.send("El campo nombre debe contener información");
        }else if(userBody.surName === ""){
            res.statusCode = 400;
            res.send("El campo apellido debe contener información");
        }else if(userBody.email === ""){
            res.statusCode = 400;
            res.send("El campo email debe contener información");
        }else if(userBody.password ===""){
            res.statusCode = 400;
            res.send("El campo password debe contener información");
        }else {
            if(await searchUserByEmail(userBody.email)){
                    res.status(400).json({message: "El email ya existe en la BD"});
            } else {
                const hashea = await bcrypt.hash(userBody.password, 3);
                userBody.password = hashea
                await userModel.createUser(userBody);
                res.status(200).json({message:"Usuario creado"})
            }
        }
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        throw new Error(error)
    }
}

const logoutUser = () => {}

const searchUserByEmail = async(email) => {
    return await userModel.findUserByMail(email);
}
module.exports = { 
    loginUser,
    logoutUser,
    registerUser
}