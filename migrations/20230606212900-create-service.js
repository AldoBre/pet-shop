module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable('services', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
              },
            service_name:{
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.STRING
            },
            duration:{
                type:Sequelize.STRING
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
        await queryInterface.dropTable('services');
    }
}