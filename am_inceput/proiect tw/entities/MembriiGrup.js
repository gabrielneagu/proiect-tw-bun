const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

const MembriiGrup = db.define("MembriiGrup", {
  idMembru: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  idUtilizator: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
  idGrup: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
});
module.exports.MembriiGrup = MembriiGrup;
