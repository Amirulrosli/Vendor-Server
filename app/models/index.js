const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.payments = require("./Payment.model.js")(sequelize,Sequelize);
db.notification = require("./notification.model.js")(sequelize,Sequelize);
db.slot = require("./slot.model.js")(sequelize,Sequelize);
db.email = require("./email.model.js")(sequelize,Sequelize);
db.account = require("./account.model.js")(sequelize, Sequelize);
db.attachment = require("./attachment.model.js")(sequelize,Sequelize);
db.relative = require('../models/Relative.model.js')(sequelize,Sequelize);

// db.tutorials.hasMany(db.payments, { as: "payments "});
// db.payments.belongsTo(db.tutorials, {
//   foreignKey: "tutorialID", 
//   as: "tutorial",
// });
module.exports = db;