const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

Utilizatori = db.define("Utilizatori", {
  idUtilizator: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  numeUtilizator: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [1, 100] },
  },
  parola: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [1, 100] },
  },

  nrTelefon: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: { len: [1, 50] },
  },

  adresa: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [1, 150] },
  },
  ImagineProfil: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  detalii: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { len: [1, 200] },
  },
});
module.exports.Utilizatori = Utilizatori;
