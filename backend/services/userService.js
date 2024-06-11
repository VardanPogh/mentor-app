const User = require('../models/User');
const Field = require('../models/Field');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

async function findUser(query) {
    try {
        return User.findOne(query);

    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

async function getAllUsers(queryObj) {
    try {
        const { firstName, lastName, type, fieldId } = queryObj;

        const query = {
            where: {},
            include: {
                model: Field,
                as: 'field'
            }
        };

        if (firstName) {
            query.where.firstName = { [Op.iLike]: `%${firstName}%` };
        }
        if (lastName) {
            query.where.lastName = { [Op.iLike]: `%${lastName}%` };
        }
        if (type) {
            query.where.type = type;
        }
        if (fieldId) {
            query.where.fieldId = fieldId;
        }

        return await User.findAll(query);
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
}

async function getProfile(userId) {
    try {
        return await User.findByPk(
            userId,
            { include: Field }
        );
    } catch (error) {
        throw new Error(`Error fetching profile: ${error.message}`);
    }

}

async function updateProfile(reqUserId, userId, body) {
    try {
        const {
            firstName,
            lastName,
            email,
            type,
            position,
            fieldId,
            description,
            education,
            experience,
            about
        } = body;

        if (!firstName || !lastName || !email) {
            throw new Error('Missing required fields');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }


        const user = await getProfile(userId);

        if (reqUserId !== user.id) {
            throw new Error('Unauthorized');
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.type = type;
        user.position = position;
        user.fieldId = fieldId;
        user.description = description;
        user.education = education;
        user.experience = experience;
        user.about = about;

        await user.save();

    } catch (error) {
        throw new Error(`${error.message}`);
    }

}

async function createUser(body) {
    try {
        const {
            firstName,
            lastName,
            type,
            position,
            fieldId,
            description,
            email,
            education,
            experience,
            about,
            password
        } = body;

        // Basic input validation
        if (!firstName || !lastName || !email || !password) {
            throw new Error('Missing required fields');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return await User.create({
            firstName,
            lastName,
            type,
            position,
            fieldId,
            description,
            email,
            education,
            experience,
            about,
            password: hashedPassword
        });
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }

}

module.exports = {
    findUser,
    createUser,
    getAllUsers,
    updateProfile,
    getProfile
};
