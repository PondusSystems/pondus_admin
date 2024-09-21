const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config({ path: "./configs/.env" });
const connectDB = require("./configs/db.config");
const routes = require('./routes/index');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

//Express Server Setup
const app = express();
const port = process.env.PORT || 5333;
const corsOptions = {
    origin: ['https://app.pondus.io', 'https://www.app.pondus.io', 'https://admin.pondus.io', 'https://www.admin.pondus.io'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

//Express Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

// Connection URL
const DB = process.env.DB_URI;
connectDB(DB);

//Server status endpoint
app.get('/', (req, res) => {
    res.send('Admin test Server is Up!');
});

// Routes
app.use("/api", routes);

//Error Handler
app.use(errorHandlerMiddleware);


app.listen(port, () => {
    console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
