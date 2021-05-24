module.exports = (sequelize,Sequelize) => {
    const photo = sequelize.define("photos", {
        rid: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        date_Uploaded: {
            type: Sequelize.DATE
        }
    });

    return photo;
}