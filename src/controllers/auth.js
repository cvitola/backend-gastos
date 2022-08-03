const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async(req,res,next) => {
    try {
        const userBody = req.body;
        const user = await searchUserByEmail(userBody.email);
        if(user){
            const result = await bcrypt.compare(userBody.password, user.password);
            console.log(result)
            if(result){
                const token = jwt.sign(
                    {
                        id: user._id,
                        firstName: user.name,
                        lastName: user.surName,
                        email: user.email,
                        role: getUserRole(user)
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: 2000}
                );
                res.status(200).json({token: token})
            }else{
                res.status(403).json({message:"La contraseña es incorrecta"})
            }
        }else{
            res.status(403).json({message:"Error usuario es incorrecto"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
}

const registerUser = async(req,res,next) => {
    try {
        const userBody = req.body;
        console.log("UserBody: ")
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
                console.log(userBody.password)
                const hashea = await bcrypt.hash(userBody.password, 10);
                userBody.password = hashea

                await userModel.createUser(userBody);
                res.status(200).json({message:"Usuario creado"})
            }
        }
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message)
    }
}

const logoutUser = () => {}

const searchUserByEmail = async(email) => {
    return await userModel.findUserByMail(email);
}

const getUserRole = (u) => {
    return u.role === "admin" ? "admin":"none";
}
module.exports = { 
    loginUser,
    logoutUser,
    registerUser
}