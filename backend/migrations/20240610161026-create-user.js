'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING
            },
            position: {
                type: Sequelize.STRING
            },
            fieldId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'fields',
                    key: 'id'
                },
            },
            description: {
                type: Sequelize.TEXT
            },
            education: {
                type: Sequelize.STRING
            },
            experience: {
                type: Sequelize.STRING
            },
            about: {
                type: Sequelize.TEXT
            },
            password: {
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
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('users');
    }
};
