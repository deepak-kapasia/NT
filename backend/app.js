const express = require('express');
const cors = require('cors');
const { connect } = require('./lib/db');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

// Ensure DB is connected on every request (cached after first connect)
app.use(async (req, res, next) => {
    try {
        await connect();
        next();
    } catch (err) {
        console.error('DB connect error:', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// --- ROUTES ---

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, 'name');
        res.json(users.map((u) => u.name));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/:user', async (req, res) => {
    try {
        const { user } = req.params;
        let userData = await User.findOne({ name: user });

        if (!userData) {
            userData = new User({
                name: user,
                subjects: [],
                dailylogs: [],
            });
            await userData.save();
        }
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- SUBJECTS ---

app.get('/api/:user/subjects', async (req, res) => {
    try {
        const { user } = req.params;
        const userData = await User.findOne({ name: user });
        res.json(userData ? userData.subjects : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/:user/subjects', async (req, res) => {
    try {
        const { user } = req.params;
        const newSubjects = req.body;

        const userData = await User.findOneAndUpdate(
            { name: user },
            { subjects: newSubjects },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(userData.subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/:user/subjects/:id', async (req, res) => {
    try {
        const { user, id } = req.params;
        const userData = await User.findOne({ name: user });

        if (userData) {
            userData.subjects = userData.subjects.filter((s) => s.id !== parseInt(id) && s.id !== id);
            await userData.save();
            res.json(userData.subjects);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- DAILY LOGS ---

app.get('/api/:user/dailylogs', async (req, res) => {
    try {
        const { user } = req.params;
        const userData = await User.findOne({ name: user });
        res.json(userData ? userData.dailylogs : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/:user/dailylogs', async (req, res) => {
    try {
        const { user } = req.params;
        const newLogs = req.body;

        const userData = await User.findOneAndUpdate(
            { name: user },
            { dailylogs: newLogs },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(userData.dailylogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
