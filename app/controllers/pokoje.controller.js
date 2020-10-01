const Pokoj = require("../models/pokoje.model.js");

exports.create = (req, res) => {
  // Czy git?
  if (!req.body) {
    res.status(400).send({
      message: "gościu, zapyranie nie może być puste!"
    });
  }

  // tak
  const pokoj = new Pokoj({
    numer_pokoju: req.body.numer_pokoju,
    ilu_osobowy: req.body.ilu_osobowy,
    zajety: req.body.zajety
  });

  // Dodaj nowego
  Pokoj.create(pokoj, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Wystąpił błąd podczas dodawania nowego pokoju."
      });
    else res.send(data);
  });
};

// Daj wsszystkcih.
exports.findAll = (req, res) => {
  Pokoj.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Wystąpił błąd podczas wyszukiwania wsyzstkich pokoi."
      });
    else res.send(data);
  });
};

// Daj jednego
exports.findOne = (req, res) => {
  Pokoj.findById(req.params.pokojId, (err, data) => {
    if (err) {
      if (err.kind === "nieznaleziono") {
        res.status(404).send({
          message: `Nie znaleziono pokoju o wskazanym id ${req.params.pokojId}.`
        });
      } else {
        res.status(500).send({
          message: "Wystąpił błąd podczas wyszukwiania pokoju o id " + req.params.pokojId
        });
      }
    } else res.send(data);
  });
};

// Zaktaulizuj konkretnego
exports.update = (req, res) => {
  // czy git?
  if (!req.body) {
    res.status(400).send({
      message: "Byczku, zapytanie nie może być puste"
    });
  }

  console.log(req.body);

  Pokoj.updateById(
    req.params.pokojId,
    new Pokoj(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "nieznaleziono") {
          res.status(404).send({
            message: `Nie znaleziono pokoju o id ${req.params.pokojId}.`
          });
        } else {
          res.status(500).send({
            message: "Wystąpił błąd przy aktualizowaniu pokoju o id " + req.params.pokojId
          });
        }
      } else res.send(data);
    }
  );
};

// usuń konkreta
exports.delete = (req, res) => {
  Pokoj.remove(req.params.pokojId, (err, data) => {
    if (err) {
      if (err.kind === "nieznaleziono") {
        res.status(404).send({
          message: `Nie znaleziono pokoju o id ${req.params.pokojId}.`
        });
      } else {
        res.status(500).send({
          message: "Nie można usunąć pokoju o id " + req.params.pokojId
        });
      }
    } else res.send({ message: `usuniety !` });
  });
};

// Wywal wszystko.
exports.deleteAll = (req, res) => {
  Pokoj.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Wystąpił błąd."
      });
    else res.send({ message: `Wywalono wszystkich !` });
  });
};
