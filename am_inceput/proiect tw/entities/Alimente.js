const { db } = require("../dbConfig.js");
const { Sequelize } = require("sequelize");

const Alimente = db.define("Alimente", {
  idAliment: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  numeAliment: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  cantitate: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
  categorie: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  
  dataExpirare: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  disponibilitate: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  idUtilizator: {
    type: Sequelize.INTEGER,
    primaryKey: false,
    autoIncrement: false,
    allowNull: false,
  },
});
module.exports.Alimente = Alimente;
