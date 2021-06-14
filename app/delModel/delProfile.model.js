module.exports = (sequelize,Sequelize) => {
    const delProfile = sequelize.define("delprofiles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        ref_No: {
            type: Sequelize.STRING,
        },
        rid: {
            type: Sequelize.STRING,
        },
        IC_Number: {
            type: Sequelize.STRING
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
        latest_Due_Date: {
            type: Sequelize.DATE
        },
        rent_Date: {
            type: Sequelize.STRING
        },
        latest_Payment: {
            type: Sequelize.DOUBLE
        },
        overdue: {
            type: Sequelize.BOOLEAN
        },
        phone: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.STRING
        },
        contract: {
            type: Sequelize.BOOLEAN
        }

    });

    return delProfile;
}