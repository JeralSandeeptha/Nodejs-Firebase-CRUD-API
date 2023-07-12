const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.all('*', (req, res, next) => {
    const error = new Error(`Can't find ${req.url} on the server`);
    error.status = 'fail';
    error.statusCode = 404;
    next(error);
});

app.use( (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'Error';

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    });
});

app.listen(6000, () => {
    console.log("Server is running at port 6000");
});