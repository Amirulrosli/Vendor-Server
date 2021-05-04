module.exports = (sequelize,Sequelize) => {
    const Email = sequelize.define("email", {
        rid: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        body: {
            type: Sequelize.STRING
        },
        IC_Number: {
            type: Sequelize.STRING
        },
        Date: {
            type: Sequelize.DATE
        },

        slot_Number: {
            type: Sequelize.STRING
        }
     

    });

    return Email;
}