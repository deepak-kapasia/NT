require('dotenv').config();
const app = require('./app');
const { connect } = require('./lib/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connect();
        console.log('MongoDB connected');
        console.log('Hardcoded users initialized');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

startServer();
