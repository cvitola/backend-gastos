const getCollection = require("../utils/mongoDBClient").getCollection;
/*
{
  id: 4674hgdffy_,
  date: "02/05/2022",
  category: "Comida" --> habrá una lista de categorias a elegir.
  amount: "5800",
  ticket: imagen...PENDIENTE.
}
*/
const createSpend = async (date,category,amount) => {
    try {
      const spendsCollection = getCollection("gastos");
      const newSpend = await spendsCollection.insertOne({
        date: date,
        category: category,
        amount: amount
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

  module.exports = { createSpend, 
                      getAllSpends
                    }