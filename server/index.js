const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { mongoose } = require('./database');
/*const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });*/
require('./middlewares/auth');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
app.use('/api', require('./routes/technologyRoutes'));

// Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server running on port: ${app.get('port')}`);
});