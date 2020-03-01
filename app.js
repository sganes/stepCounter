const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const counterRoutes = require('./routes/counter');


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', counterRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is up on port 8080');
});
