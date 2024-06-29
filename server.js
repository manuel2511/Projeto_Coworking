const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models');
const swaggerDocs = require('./docs/swagger');
const app = express( );
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use('/', require('./routes'));

const paymentConditionRoutes = require('./routes/paymentConditionRoutes');
app.use('/payment-conditions', paymentConditionRoutes);

swaggerDocs(app);

const PORT = process.env.PORT_APP || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
