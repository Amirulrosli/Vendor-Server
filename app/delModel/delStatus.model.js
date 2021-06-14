
module.exports = (sequelize,Sequelize) => {
    const delstatus = sequelize.define("delstats", {
        rid:{
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        overdue_Day: {
            type: Sequelize.DOUBLE
        },
        last_Payment_Date: {
            type: Sequelize.DATE
        },
        next_Payment_Date: {
            type: Sequelize.DATE
        }
    });

    return delstatus;
}