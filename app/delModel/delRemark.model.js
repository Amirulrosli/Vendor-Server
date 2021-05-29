module.exports = (sequelize,Sequelize) => {
    const delRemark = sequelize.define("delremarks", {
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

    return delRemark;
}