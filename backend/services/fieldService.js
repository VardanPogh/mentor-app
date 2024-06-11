const Field = require('../models/Field');

async function getAllFields() {
    try {
        return await Field.findAll();
    } catch (error) {
        console.error(`Error fetching field: ${error.message}`);
        return [];
    }
}

module.exports = {
    getAllFields
};
