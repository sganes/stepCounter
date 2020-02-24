const express = require('express');
const bodyParser = require('body-parser');

const counterRoutes = require('./routes/counter');


const app = express();

app.use(bodyParser.json());
app.use('/api', counterRoutes);

app.listen(8080);
