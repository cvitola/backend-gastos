const express = require("express");
const bodyParser = require("body-parser");

const spendRouter = require("./src/routes/spend");

const app = express();
app.use(bodyParser.json());

app.use('/api/spends', spendRouter);
app.use( ( req, res, next ) => {
    res.statusCode = 404;
    res.send("Hola Mundo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT} ⭐️`)
);