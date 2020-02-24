const express = require('express');
const bodyParser = require('body-parser');

const counterRoutes = require('./routes/counter');


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', counterRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is yup on port 8080');
});
