
module.exports = (sequelize,Sequelize) => {
    const account = sequelize.define("Account", {
        rid:{
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        IC_Number: {
            type: Sequelize.STRING
        },
        last_Login: {
            type: Sequelize.DATE
        },
        role:{
            type: Sequelize.STRING
        }
    });

    return account;
}