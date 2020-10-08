const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// wspracie dla jsona
app.use(bodyParser.json());

// wspracie dla requestów od jsona
app.use(bodyParser.urlencoded({ extended: true }));

// główny route
app.get("/", (req, res) => {
  res.json({ wiadomosc: "Kierunki: /pokoje ; /dodajpokoj ; /pokoje/:pokojId ; /updatepokoj/:pokojId ; /usunpokoj/:pokojId ; /usunall " });
});

require("./app/routes/pokoje.routes.js")(app);

// startowanie
const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`API zostało uruchomione na porcie ${PORT}.`);
});
