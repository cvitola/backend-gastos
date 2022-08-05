const getCollection = require("../utils/mongoDBClient").getCollection;
var mongodb = require('mongodb');
/*
{
  id: 4674hgdffy_,
  date: "02/05/2022",
  category: "Comida" --> habrá una lista de categorias a elegir.
  amount: "5800",
  ticket: imagen...PENDIENTE.
}
*/
const createSpend = async (date,category,amount,userID) => {
    try {
      const spendsCollection = getCollection("gastos");
      const newSpend = await spendsCollection.insertOne({
        date: date,
        category: category,
        amount: amount,
        userID: userID
      });
  
      return newSpend;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getAllSpends = async () => {
    try{
      const spendsCollection = getCollection("gastos");
      const spends = await spendsCollection.find().toArray();
      return spends;
    } catch(error){
      console.log(error);
      throw new Error (error)
    }
  }

  const getSpendsByUser = async(userID) => {
    try {
      const spendsCollection = getCollection("gastos");
      const spendsByUser = await spendsCollection.find({userID: userID}).toArray();
      return spendsByUser;
    } catch (error) {
        console.log(error);
        throw new Error (error)
    }
  }

  const deleteSpend = async(id) => {
    try {
      const spendsCollection = getCollection("gastos");
      const query = {_id: new mongodb.ObjectID(id)}
      console.log(query)
      const deleteSp = await spendsCollection.deleteOne(query);
      console.log(deleteSp)
      return deleteSp;

    } catch (error) {
      console.log(error);
      throw new Error (error)
    }
  }

  module.exports = { 
    createSpend, 
    getAllSpends,
    getSpendsByUser,
    deleteSpend
  }