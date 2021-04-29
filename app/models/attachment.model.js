
module.exports = (sequelize,Sequelize) => {
    const attachment = sequelize.define("Attachment", {
        rid: {
            type: Sequelize.STRING
        },
        vendor_rid:{
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        account_rid: {
            type: Sequelize.STRING
        },
        date_Uploaded: {
            type: Sequelize.DATE
        }
    });

    return attachment;
}