'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('fields', [
            { title: 'Engineering' },
            { title: 'Medical' },
            { title: 'Business' },
            { title: 'Education' },
            { title: 'Arts' },
            { title: 'Science' },
            { title: 'Technology' },
            { title: 'Finance' },
            { title: 'Law' },
            { title: 'Social Sciences' },
        ], {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('fields', null, {});
    }
};
