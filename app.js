const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const spendRouter = require("./src/routes/spend");
const categoryRouter = require("./src/routes/category");
const connectMongo = require("./src/utils/mongoDBClient").connectMongo;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use( cors() );

app.use('/api/spends', spendRouter);
app.use('/api/category', categoryRouter);
app.use( ( req, res, next ) => {
    res.statusCode = 404;
    res.send("Hola Mundo");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () =>
      console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`)
    );
  } catch (error) {
    throw error;
  }
};

startServer();
