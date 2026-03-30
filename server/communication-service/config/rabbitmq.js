const amqp = require("amqplib");
const MessageThread = require("../models/MessageThread");

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI || "amqp://localhost");
    const channel = await connection.createChannel();
    
    await channel.assertQueue("property_events");
    console.log("🐰 RabbitMQ Connected (Listening for Events...)");

    channel.consume("property_events", async (msg) => {
      if (msg !== null) {
        const event = JSON.parse(msg.content.toString());
        
        if (event.action === "PROPERTY_DELETED") {
          console.log(`📥 Received Event: Property ${event.propertyId} was deleted!`);
          
          // ⚡ THE MAGIC HAPPENS HERE ⚡
          // We instantly find all message threads related to this property and lock them!
          await MessageThread.updateMany(
            { property: event.propertyId },
            { $set: { propertyDeleted: true } }
          );
          
          console.log(`🔒 All message threads for property ${event.propertyId} have been archived.`);
        }
        
        channel.ack(msg);
      }
    });

  } catch (error) {
    console.error("❌ RabbitMQ Connection Error:", error);
  }
}

module.exports = { connectRabbitMQ };