const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

const CereriPrietenie = db.define("CereriPrietenie", {
  idEmitator: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  },
  idReceptor: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  },
});

module.exports.CereriPrietenie = CereriPrietenie;
