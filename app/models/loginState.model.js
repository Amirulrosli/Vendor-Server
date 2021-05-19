module.exports = (sequelize,Sequelize) => {
    const loginState = sequelize.define("loginState", {
        rid: {
            type: Sequelize.STRING
        },
        login_state: {
            type: Sequelize.BOOLEAN
        }
     

    });

    return loginState;
}