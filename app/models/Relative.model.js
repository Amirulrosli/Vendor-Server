
module.exports = (sequelize,Sequelize) => {
    const relative = sequelize.define("Relative", {
        rid:{
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        IC_Number: {
            type: Sequelize.STRING
        },
        relationship: {
            type: Sequelize.STRING
        }
    });

    return relative;
}