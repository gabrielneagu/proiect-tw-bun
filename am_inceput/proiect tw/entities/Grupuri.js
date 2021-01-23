const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

const Grupuri = db.define("Grupuri", {
  idGrup: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  idAdmin: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  numeGrup: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 100],
    },
    allowNull: false,
  },
});
module.exports.Grupuri = Grupuri;
