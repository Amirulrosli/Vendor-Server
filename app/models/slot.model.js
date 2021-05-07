module.exports = (sequelize,Sequelize) => {
    const Slot = sequelize.define("slots", {
        rid: {
            type: Sequelize.STRING,
        },
        slot_Number: {
            type: Sequelize.STRING
        },
        slot_Price: {
            type: Sequelize.DOUBLE
        },
        location: {
            type: Sequelize.STRING
        },

        taken: {
            type:Sequelize.BOOLEAN,
        }

    });

    return Slot;
}