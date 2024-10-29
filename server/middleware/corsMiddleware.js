const allowedOrigins = require('../configs/allowedOrigins.config.json');

const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
    const origins = allowedOrigins[env];

    if (!origin || origins.includes(origin)) {
        // Allowed origin
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        return next();
    }

    // Not allowed origin
    res.status(403).json({ message: 'CORS policy: No access from this origin.', access: "blocked" });
};

module.exports = corsMiddleware;
