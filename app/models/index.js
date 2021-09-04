const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.MYPORT,
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
db.location = require('../models/location.model.js')(sequelize,Sequelize);
db.loginState = require('../models/loginState.model.js')(sequelize,Sequelize);
db.remark = require('../models/remarks.model')(sequelize,Sequelize);
db.photo = require('../models/photo.model')(sequelize,Sequelize);
db.delAttachment = require('../delModel/delAttachment.model')(sequelize,Sequelize);
db.delPayment = require('../delModel/delPayment.model')(sequelize,Sequelize);
db.delPhoto = require('../delModel/delPhoto.model')(sequelize,Sequelize);
db.delProfile = require('../delModel/delProfile.model')(sequelize,Sequelize);
db.delRelative = require('../delModel/delRelative.model')(sequelize,Sequelize);
db.delRemark = require('../delModel/delRemark.model')(sequelize,Sequelize);
db.delStatus = require('../delModel/delStatus.model')(sequelize,Sequelize);


// db.tutorials.hasMany(db.payments, { as: "payments "});
// db.payments.belongsTo(db.tutorials, {
//   foreignKey: "tutorialID", 
//   as: "tutorial",
// });
module.exports = db;