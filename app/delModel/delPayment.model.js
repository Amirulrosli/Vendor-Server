module.exports = (sequelize,Sequelize) => {
    const delPayment = sequelize.define("delpayments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        paymentID: {
            type: Sequelize.STRING
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

    return delPayment;
}