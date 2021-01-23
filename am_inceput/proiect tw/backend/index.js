const express = require("express");
const bodyParser = require("body-parser");
const { db } = require("./dbConfig.js");
const { Utilizatori } = require("./entities/Utilizatori.js");
const { Alimente } = require("./entities/Alimente.js");
const { Claim } = require("./entities/Claim.js");
const { Prieteni } = require("./entities/Prieteni.js");
const { MembriiGrup } = require("./entities/MembriiGrup");
const { Grupuri } = require("./entities/Grupuri");
const { CereriPrietenie } = require("./entities/CereriPrietenie");
const cors = require("cors");
const { Op } = require("sequelize");
console.log("--------");
let app = express();
app.use(cors());
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

Utilizatori.hasMany(Alimente, { as: "Alimente", foreignKey: "idUtilizator" });
Alimente.belongsTo(Utilizatori, { foreignKey: "idUtilizator" });

Utilizatori.hasMany(Claim, { as: "Claim", foreignKey: "idUtilizator" });
Claim.belongsTo(Utilizatori, { foreignKey: "idUtilizator" });

Alimente.hasMany(Claim, { as: "Claim", foreignKey: "idAliment" });
Claim.belongsTo(Alimente, { foreignKey: "idAliment" });

Utilizatori.hasMany(CereriPrietenie, {
  as: "CereriPrietenie",
});

CereriPrietenie.belongsTo(Utilizatori, { foreignKey: "idEmitator" });
CereriPrietenie.belongsTo(Utilizatori, { foreignKey: "idReceptor" });

Utilizatori.hasMany(Prieteni, {
  as: "Utilizator",
  foreignKey: "idPrieten1",
});
Utilizatori.hasMany(Prieteni, {
  as: "Prieteni",
  foreignKey: "idPrieten2",
});

Prieteni.belongsTo(Utilizatori, {
  foreignKey: "idPrieten1",
});
Prieteni.belongsTo(Utilizatori, { foreignKey: "idPrieten2" });

//grupuri
Utilizatori.hasMany(MembriiGrup, {
  as: "MembriiGrup",
  foreignKey: "idUtilizator",
});
MembriiGrup.belongsTo(Utilizatori, { foreignKey: "idUtilizator" });

Utilizatori.hasMany(Grupuri, {
  as: "GrupuriAdministrate",
  foreignKey: "idAdmin",
});
Grupuri.belongsTo(Utilizatori, { foreignKey: "idAdmin" });

Grupuri.hasMany(MembriiGrup, { as: "MembriiGrup", foreignKey: "idGrup" });
MembriiGrup.belongsTo(Grupuri, { foreignKey: "idGrup" });

async function createUtilizatori(utilizator) {
  return await Utilizatori.create(utilizator, {
    include: [
      {
        model: Prieteni,
        as: "Prieteni",
      },
      {
        model: Grupuri,
        as: "GrupuriAdministrate",
      },

      {
        model: Alimente,
        as: "Alimente",
      },
      {
        model: Claim,
        as: "Claim",
      },
    ],
  });
}

async function getUtilizatori() {
  return await Utilizatori.findAll({
    include: [
      {
        model: Prieteni,
        as: "Prieteni",
      },
      {
        model: Grupuri,
        as: "GrupuriAdministrate",
      },
      {
        model: Alimente,
        as: "Alimente",
      },
      {
        model: Claim,
        as: "Claim",
      },
    ],
  });
}

async function getUserById(id) {
  return await Utilizatori.findByPk(id, {
    include: [
      {
        model: Prieteni,
        as: "Prieteni",
      },
      {
        model: Grupuri,
        as: "GrupuriAdministrate",
      },
      {
        model: Alimente,
        as: "Alimente",
      },
      {
        model: Claim,
        as: "Claim",
      },
    ],
  });
}

async function updateUtilizator(id, updateElem) {
  let utilizator = await Utilizatori.findByPk(id);
  if (!utilizator) return "nu exista";
  else {
    updateElem.idUtilizator = id;
    return await utilizator.update(updateElem);
  }
}

async function deleteUtilizator(id) {
  let deleteElem = await Utilizatori.findByPk(id);

  if (!deleteElem) return "Nu exista";

  try {
    return await deleteElem.destroy();
  } catch (e) {
    if (e.message.includes("FK_Aliment_Utilizator"))
      return "Entitatea este folosita in alta parte";
    else throw e;
  }
}

async function createAlimente(aliment) {
  return await Alimente.create(aliment, {
    include: [
      {
        model: Claim,
        as: "Claim",
      },
    ],
  });
}

async function getAlimente() {
  return await Alimente.findAll({
    include: [
      {
        model: Claim,
        as: "Claim",
      },
    ],
  });
}
async function updateAliment(id, updateElem) {
  let aliment = await Alimente.findByPk(id);
  if (!aliment) return "nu exista";
  else {
    updateElem.idAliment = id;
    return await aliment.update(updateElem);
  }
}

async function deleteAliment(id) {
  let deleteElem = await Alimente.findByPk(id);

  if (!deleteElem) return "Nu exista";

  try {
    return await deleteElem.destroy();
  } catch (e) {
    if (e.message.includes("FK_Claim_Aliment"))
      return "Entitatea este folosita in alta parte";
    else throw e;
  }
}

//cereri de prietenie
async function createCererePrietenie(cerere) {
  return await CereriPrietenie.create(cerere);
}

async function getCereriPrietenie() {
  return await CereriPrietenie.findAll();
}

async function deleteCerere(id) {
  let deleteElem = await CereriPrietenie.findByPk(id);

  if (!deleteElem) return "Nu exista";

  try {
    return await deleteElem.destroy();
  } catch (e) {
    throw e;
  }
}

//Prieteni
async function createPrieteni(body) {
  await Prieteni.create(body);
  let body2 = {};
  body2.idPrieten1 = body.idPrieten2;
  body2.idPrieten2 = body.idPrieten1;
  await Prieteni.create(body2);
  return { message: "created" };
}
async function getPrieteni(id) {
  let prieteni = await Prieteni.findAll({
    where: {
      idPrieten2: id,
    },
  });

  return prieteni;
}

async function deletePrieten(id) {
  let deleteElem = await Prieteni.findByPk(id);
  let prieten = {};
  prieten.id1 = deleteElem.idPrieten2;
  prieten.id2 = deleteElem.idPrieten1;
  if (!deleteElem) return "Nu exista";

  try {
    await deleteElem.destroy();
    deleteElem = await Prieteni.findOne({
      where: {
        idPrieten1: prieten.id1,
        idPrieten2: prieten.id2,
      },
    });
    deleteElem.destroy();
    return { message: "Prieten sters" };
  } catch (e) {
    throw e;
  }
}

//claim

async function createClaim(claim) {
  return await Claim.create(claim);
}

async function getClaim() {
  return await Claim.findAll();
}

async function getClaimId(id_aliment) {
  return await Claim.findAll({
    where: {
      idAliment: id_aliment,
    },
  });
}

async function deleteClaim(id) {
  let deleteElem = await Claim.findByPk(id);

  if (!deleteElem) return "Nu exista";

  try {
    return await deleteElem.destroy();
  } catch (e) {
    throw e;
  }
}

async function createGrup(grup) {
  return await Grupuri.create(grup, {
    include: [
      {
        model: MembriiGrup,
        as: "MembriiGrup",
      },
    ],
  }).then(async function () {
    let membru = {};
    membru.idGrup = await Grupuri.max("idGrup");
    membru.idUtilizator = grup.idAdmin;
    await createMembruGrup(membru);
  });
}

async function deleteGrup(id) {
  let grup = await Grupuri.findByPk(id);
  let membrii = await getMembriiGrup(grup.idGrup);
  for (let i = 0; i < membrii.length; i++) {
    if (!membrii[i]) return "Nu exista";
    try {
      await membrii[i].destroy();
    } catch (e) {
      throw e;
    }
  }
}
async function updateGrup(nume, id) {}

async function createMembruGrup(membru) {
  return await MembriiGrup.create(membru);
}
async function getGrupuri(id_Utilizator) {
  return await MembriiGrup.findAll({
    where: {
      idUtilizator: id_Utilizator,
    },
  });
}
async function getMembriiGrup(id_grup) {
  return await MembriiGrup.findAll({
    where: {
      idGrup: id_grup,
    },
  });
}
async function deleteMembruGrup(id) {
  if (!deleteElem) return "Nu exista";

  try {
    return await deleteElem.destroy();
  } catch (e) {
    throw e;
  }
}

router.route("/utilizatori").post(async (req, res) => {
  res.json(await createUtilizatori(req.body));
});

router.route("/utilizatori").get(async (req, res) => {
  res.json(await getUtilizatori());
});

router.route("/utilizatori/:id").get(async (req, res) => {
  res.json(await getUserById(req.params.id));
});

router.route("/utilizatori/:id").delete(async (req, res) => {
  res.json(await deleteUtilizator(req.params.id));
});

router.route("/utilizatori/:id").put(async (req, res) => {
  res.json(await updateUtilizator(req.params.id, req.body));
});

router.route("/alimente").post(async (req, res) => {
  res.json(await createAlimente(req.body));
});
router.route("/alimente").get(async (req, res) => {
  res.json(await getAlimente(req.body));
});

router.route("/alimente/:id").put(async (req, res) => {
  res.json(await updateAliment(req.params.id, req.body));
});

router.route("/alimente/:id").delete(async (req, res) => {
  res.json(await deleteAliment(req.params.id));
});

router.route("/claim").post(async (req, res) => {
  res.json(await createClaim(req.body));
});
router.route("/claim").get(async (req, res) => {
  res.json(await getClaim(req.body));
});
router.route("/utilizatori/:id").put(async (req, res) => {
  res.json(await updateClaim(req.params.id, req.body));
});
router.route("/claim/:id").delete(async (req, res) => {
  res.json(await deleteClaim(req.params.id));
});

//cereri prietenie
router.route("/cereriPrietenie").post(async (req, res) => {
  res.json(await createCererePrietenie(req.body));
});

router.route("/cereriPrietenie").get(async (req, res) => {
  res.json(await getCereriPrietenie());
});

router.route("/cereriPrietenie/:id").delete(async (req, res) => {
  res.json(await deleteCerere(req.params.id));
});

router.route("/cereriPrietenie/:id").put(async (req, res) => {
  res.json(await updateCererePrietenie(req.params.id, req.body));
});

//prieteni
router.route("/prieteni").post(async (req, res) => {
  res.json(await createPrieteni(req.body));
});

router.route("/prieteni/:id").delete(async (req, res) => {
  res.json(await deletePrieten(req.params.id));
});
router.route("/prieteni/:id").get(async (req, res) => {
  res.json(await getPrieteni(req.params.id));
});

router.route("/grupuri").post(async (req, res) => {
  res.json(await createGrup(req.body));
});

router.route("/grupuri/:id").post(async (req, res) => {
  res.json(await getMembriiGrup(req.params.id));
});

router.route("/grupuriByIdUtilizator/:id").get(async (req, res) => {
  res.json(await getGrupuri(req.params.id));
});

router.route("/membriiGrup").post(async (req, res) => {
  res.json(await createMembruGrup(req.body));
});

router.route("/grupuriByUser/:id").get(async (req, res) => {
  res.json(await getGrupuri(req.params.id));
});

router.route("/membriiGrup/:id").get(async (req, res) => {
  res.json(await getMembriiGrup(req.params.id));
});

let port = process.env.PORT || 8000;
app.listen(port);
console.log("API is runnning at " + port);
