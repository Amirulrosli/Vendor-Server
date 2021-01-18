module.exports = (sequelize,Sequelize) => {
    const Tutorial = sequelize.define("profile", {
        id: {
            type: Sequelize.DOUBLE,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        IC_Number: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        latest_Payment_Date: {
            type: Sequelize.DATE
        },
        latest_Payment: {
            type: Sequelize.DOUBLE
        },
        overdue: {
            type: Sequelize.DOUBLE
        }

    });

    return Tutorial;
}