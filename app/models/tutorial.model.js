module.exports = (sequelize,Sequelize) => {
    const Tutorial = sequelize.define("profiles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        rid: {
            type: Sequelize.STRING,
        },
        IC_Number: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        slot: {
            type: Sequelize.STRING
        },
        slot_Price: {
            type: Sequelize.DOUBLE
        },
        latest_Payment_Date: {
            type: Sequelize.DATE
        },
        rent_Date: {
            type: Sequelize.STRING
        },
        latest_Payment: {
            type: Sequelize.DOUBLE
        },
        overdue: {
            type: Sequelize.DOUBLE
        },
        phone: {
            type: Sequelize.INTEGER
        }

    });

    return Tutorial;
}