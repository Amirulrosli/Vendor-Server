module.exports = (sequelize,Sequelize) => {
    const Slot = sequelize.define("slots", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rid: {
            type: Sequelize.STRING,
        },
        slot_Number: {
            type: Sequelize.STRING
        },
        taken: {
            type:Sequelize.BOOLEAN,
        }

    });

    return Slot;
}