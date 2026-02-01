require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

let isConnected = false;
let initUsersDone = false;

const hardcodedUsers = [
    {
        name: 'Deepak',
        subjects: [
            {
                id: 'deepak-subject-1',
                name: 'Data Structures',
                description: 'Learning DSA fundamentals',
                entries: [],
                createdAt: new Date().toISOString(),
            },
        ],
        dailylogs: [],
    },
    {
        name: 'Anjali',
        subjects: [
            {
                id: 'anjali-subject-1',
                name: 'Web Development',
                description: 'Full stack development',
                entries: [],
                createdAt: new Date().toISOString(),
            },
        ],
        dailylogs: [],
    },
];

async function initUsers() {
    if (initUsersDone) return;
    initUsersDone = true;
    for (const userData of hardcodedUsers) {
        const existing = await User.findOne({ name: userData.name });
        if (!existing) {
            await User.create(userData);
            console.log(`Created user: ${userData.name}`);
        }
    }
}

async function connect() {
    if (isConnected) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    await initUsers();
}

module.exports = { connect };
