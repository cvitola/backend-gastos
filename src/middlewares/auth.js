const e = require("express");
const jwt = require("jwt");

const authorizeAdmin = async (req,res,next) => {
    const tokenHeader = req.headers["authrorization"];
    if(!tokenHeader) {
        res.status(401).json({message: "No hay token: No Autorizado"});
    }else{
        const token = tokenHeader.split(" ")[1];
        try {
            const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if(data.role !== "admin" ){
                res.status(403).json({message: "No Autorizado: debe ser admin"});
            }else{
                req.user.id = data.id;
                req.user.role = data.role;
                req.user.email = data.email;
                next();
            }
        } catch (error) {
            res.status(403).json({message: error.message})
        }
    }
    
};

module.exports = {
    authorizeAdmin
}
