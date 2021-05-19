module.exports = (sequelize,Sequelize) => {
    const Location = sequelize.define("location", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: Sequelize.STRING
        },
        date_Updated:{
            type: Sequelize.DATE
        },
        total_Slot: {
            type:Sequelize.DOUBLE,
        }

    });

    return Location;
}