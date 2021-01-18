module.exports = (sequelize,Sequelize) => {
    const Payment = sequelize.define("payments", {
        rid: {
            type: Sequelize.STRING
        },
        payment_Date: {
            type: Sequelize.DATE
        },
        due_Date: {
            type: Sequelize.DATE
        },
        email: {
            type: Sequelize.STRING
        },
        send_Email: {
            type: Sequelize.BOOLEAN
        },
     

    });

    return Payment;
}