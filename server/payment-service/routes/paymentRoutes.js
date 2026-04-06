const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST: /api/payment/create-intent (handled via Gateway)
router.post('/create-intent', async (req, res) => {
    const { amount, currency, userEmail, propertyId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), 
            currency: currency || 'inr',
            metadata: { userEmail, propertyId }
        });

        console.log(`✅ Intent created for ₹${amount}`);
        res.status(200).send({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        console.error("❌ Stripe Error:", error.message);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;