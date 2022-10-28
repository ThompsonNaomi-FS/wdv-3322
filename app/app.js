const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('../api/routes/userRoutes');


// middleware for routers first (use)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// actuator
app.get('/', (req,res) => {
    res.status(200).json({ message: 'Service is up' });
});

// router
app.use('/users', userRoute);

// errors: use middleware for errors and bad paths
app.use((req, res,next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
});

// mongoDB connection goes at the end


module.exports = app;