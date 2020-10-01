const sql = require("./db.js");

// konstrukcaj
const Pokoj = function(pokoj) {
  this.pokoj = pokoj.numer_pokoju;
  this.ilu_osobowy = pokoj.ilu_osobowy;
  this.zajety = pokoj.zajety;
};

Pokoj.create = (nowyPokoj, result) => {
  sql.query("INSERT INTO pokoje SET ?", nowyPokoj, (err, res) => {
    if (err) {
      console.log("błąd: ", err);
      result(err, null);
      return;
    }

    console.log("Dodano nowy pokoj do bazy: ", { id: res.insertId, ...nowyPokoj });
    result(null, { id: res.insertId, ...nowyPokoj });
  });
};

Pokoj.findById = (pokojId, result) => {
  sql.query(`SELECT * FROM pokoje WHERE id = ${pokojId}`, (err, res) => {
    if (err) {
      console.log("błąd: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Znaleziono wskazany pokoj: ", res[0]);
      result(null, res[0]);
      return;
    }

    // :(
    result({ kind: "nieznaleziono" }, null);
  });
};

Pokoj.getAll = result => {
  sql.query("SELECT * FROM pokoje", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Wszystkie pokoje: ", res);
    result(null, res);
  });
};

Pokoj.updateById = (id, pokoj, result) => {
  sql.query(
    "UPDATE pokoje SET numer_pokoju = ?, ilu_osobowy = ?, zajety = ? WHERE id = ?",
    [pokoj.numer_pokoju, pokoj.ilu_osobowy, pokoj.zajety, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // owszem
        result({ kind: "nieznaleziono" }, null);
        return;
      }

      console.log("Aktualizowane dane pokoju: ", { id: id, ...pokoj });
      result(null, { id: id, ...pokoj });
    }
  );
};

Pokoj.remove = (id, result) => {
  sql.query("DELETE FROM pokoje WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // :(
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Usunięto pokój z id: ", id);
    result(null, res);
  });
};

Pokoj.removeAll = result => {
  sql.query("DELETE FROM pokoje", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Usunieto ${res.affectedRows} pokoi z bazy danych.`);
    result(null, res);
  });
};

module.exports = Pokoj;
