const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const spendRouter = require("./src/routes/spend");
const authRouter = require("./src/routes/auth");
const categoryRouter = require("./src/routes/category");
const connectMongo = require("./src/utils/mongoDBClient").connectMongo;
require('dotenv').config();

const app = express();
app.use( cors() );
app.use(bodyParser.json());

app.use('/api/spends', spendRouter);
app.use('/api/category', categoryRouter);
app.use('/api/auth', authRouter);

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
