const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI || "amqp://localhost");
    channel = await connection.createChannel();
    // Create a queue if it doesn't exist
    await channel.assertQueue("property_events"); 
    console.log("🐰 RabbitMQ Connected (Publisher Ready)");
  } catch (error) {
    console.error("❌ RabbitMQ Connection Error:", error);
  }
}

const publishEvent = (data) => {
  if (channel) {
    // Send the data as a stringified Buffer to the queue
    channel.sendToQueue("property_events", Buffer.from(JSON.stringify(data)));
    console.log(`📤 Event Published: ${data.action} on ${data.propertyId}`);
  }
};

module.exports = { connectRabbitMQ, publishEvent };