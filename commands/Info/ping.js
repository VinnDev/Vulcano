export default {
    name: "ping",
    description: "Check the bot latency",
    execute: (client, message) => {
        message.reply("Pinging...").then(msg => {
            const latency = msg.createdTimestamp - message.createdTimestamp;

            msg.edit(`👋🏻 Pong! Latency **${latency}** ms`);
        });
    }
}