module.exports = (sequelize,Sequelize) => {
    const Remark = sequelize.define("remarks", {
        rid: {
            type: Sequelize.STRING
        }, 
        account_rid:{
           type: Sequelize.STRING
        },
        Description: {
            type: Sequelize.STRING
        },
        date_Updated:{
            type: Sequelize.DATE
        },

    });

    return Remark;
}