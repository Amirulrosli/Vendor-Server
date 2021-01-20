module.exports = (sequelize,Sequelize) => {
    const Payment = sequelize.define("payments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rid: {
            type: Sequelize.STRING
        },
        payment_Date: {
            type: Sequelize.DATE
        },
        due_Date: {
            type: Sequelize.DATE
        },
        price: {
            type: Sequelize.DOUBLE
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