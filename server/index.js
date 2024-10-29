const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const allowedOrigins = require('./configs/allowedOrigins.config.json');
require('dotenv').config({ path: "./configs/.env" });
const connectDB = require("./configs/db.config");
const routes = require('./routes/index');
const corsMiddleware = require('./middleware/corsMiddleware');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

//Express Server Setup
const app = express();
const port = process.env.PORT || 5333;
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const origins = allowedOrigins[env];
const corsOptions = {
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
    credentials: true,
};

//Express Middlewares
app.use(cookieParser());
app.use(express.json());
// app.use(corsMiddleware);
app.use(cors(corsOptions));

// Connection URL
const DB = process.env.DB_URI;
connectDB(DB);

// Custom middleware to check the origin
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (!origin || origins.includes(origin)) {
        // Allow the request to proceed
        console.log('Allowed!')
        next();
    } else {
        // Reject the request
        console.log('Not Allowed!')
        res.status(403).json({ error: 'Origin not allowed' });
    }
});

//Server status endpoint
app.get('/', (req, res) => {
    res.send('Admin Server is Up!');
});

// Routes
app.use("/api", routes);

//Error Handler
app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
