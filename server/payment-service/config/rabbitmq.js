const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://localhost");
        channel = await connection.createChannel();
        // Define an 'exchange' to broadcast payment events
        await channel.assertExchange("payment_events", "fanout", { durable: false });
        console.log("🐇 Connected to RabbitMQ (Payment Service)");
    } catch (error) {
        console.error("❌ RabbitMQ Connection Error:", error);
    }
};

const publishPaymentSuccess = (data) => {
    if (!channel) return console.error("No RabbitMQ channel found");
    // Send the payment data to everyone listening
    channel.publish("payment_events", "", Buffer.from(JSON.stringify(data)));
    console.log("📤 Payment Success Event Published:", data.propertyId);
};

module.exports = { connectRabbitMQ, publishPaymentSuccess };