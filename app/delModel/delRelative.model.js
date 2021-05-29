
module.exports = (sequelize,Sequelize) => {
    const delrelative = sequelize.define("delRelative", {
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

    return delrelative;
}