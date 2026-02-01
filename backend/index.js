// Vercel serverless entry: export the Express app (no listen).
// Local dev uses server.js which calls app.listen().
module.exports = require('./app');
