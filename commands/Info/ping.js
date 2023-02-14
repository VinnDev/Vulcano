export default {
    name: "ping",
    description: "Check the bot latency",
    execute: (client, message, ctx) => {
        message.reply({ embeds: [ctx.embed().setDescription("Pinging...")] }).then(msg => {
            const latency = msg.createdTimestamp - message.createdTimestamp;

            msg.edit({ embeds: [ctx.embed().setDescription(`👋🏻 Pong! Latency **${latency}** ms`)] });
        });
    }
}