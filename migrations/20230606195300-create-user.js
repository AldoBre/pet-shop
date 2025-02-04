module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
            name:{
                type: Sequelize.STRING,
            },
            birth_date: {
                type: Sequelize.STRING
            },
            email:{
                allowNull: false,
                type:Sequelize.STRING
            },
            cpf:{
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
        })
    },

    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('users');
    }
}