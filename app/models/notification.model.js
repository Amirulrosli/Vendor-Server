module.exports = (sequelize,Sequelize) => {
    const Notification = sequelize.define("notification", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rid: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        }, 
        view: {
            type: Sequelize.BOOLEAN
        },

    });

    return Notification;
}