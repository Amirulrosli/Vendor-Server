module.exports = (sequelize,Sequelize) => {
    const delphoto = sequelize.define("delphotos", {
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

    return delphoto;
}