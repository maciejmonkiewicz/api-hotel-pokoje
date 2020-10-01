module.exports = app => {
  const pokoj = require("../controllers/pokoje.controller.js");

  // Dodaj nowego | POST
  app.post("/dodajpokoj", pokoj.create);

  // Pokaz wszysstkich | REST
  app.get("/pokoje", pokoj.findAll);

  // Pokaz jednego | REST
  app.get("/pokoje/:pokojId", pokoj.findOne);

  // Zaktualizuj konkternego | PUT
  app.put("/updatepokoj/:pokojId", pokoj.update);

  // Usun konkretnego | DELETE
  app.delete("/usunpokoj/:pokojId", pokoj.delete);

  // Usuń wszystkich w pizdu
  app.delete("/usunall", pokoj.deleteAll);
};
