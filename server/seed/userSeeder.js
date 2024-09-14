const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config({ path: "./configs/.env" });
const authUtils = require('../utils/authUtils');

const seedUser = async (userData) => {
    const DB = process.env.DB_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(DB);
    console.log('Connected to MongoDB');
    try {
        await User.deleteMany({});
        console.log('Deleted existing users');
        console.log('Seeding super admin...');
        const { name, email, password } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return console.log('A user with that email has already been registered!');
        }
        let passwordDigest = await authUtils.hashPassword(password);
        await User.create({
            name,
            email,
            password: passwordDigest,
        });
        console.log('Super Admin Seeded Successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

const superAdmin = {
    name: "Super Admin",
    email: "superadmin@gmail.com",
    password: "12345678",
};

seedUser(superAdmin);
