const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

const Claim = db.define("Claim", {
  idClaim: {
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
  idAliment: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
  cantitate: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
});
module.exports.Claim = Claim;
