const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 3100);

// Middlewares
app.use(morgan('free'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/free', require('./routes/freeRoutes'));

// Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server free Api running on port: ${app.get('port')}`);
});