const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let db;
const connectMongo = async () => {
    try{
        const client = await MongoClient.connect(process.env.DATABASE_MONGO_URL);
        console.log(client)
        db = client.db("gestionGastos");
        return client;
    }
    catch(error){
        console.log(error);
        throw "Error connection to MongoDB"     
    }
    };        

    const getCollection = (collection) => {
        console.log(db)
        if(db) {
            return db.collection(collection)
        }
        throw "No MongoDB connection"
    }
module.exports = { connectMongo,
    getCollection 
                }
