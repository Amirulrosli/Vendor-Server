module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Amin12345678",
    DB: "vendormanagement",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };