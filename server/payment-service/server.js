require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Use the routes
// Note: If your Gateway sends "/api/payment/create-intent", 
// and the Gateway handles the "/api/payment" prefix, use "/" here.
app.use('/', paymentRoutes); 

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`🚦 Payment Service running on port ${PORT}`);
});