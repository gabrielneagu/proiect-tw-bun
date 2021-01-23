const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

const Prieteni = db.define("Prieteni", {
  idPrieteni: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  idPrieten1: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
  idPrieten2: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
});
module.exports.Prieteni = Prieteni;
