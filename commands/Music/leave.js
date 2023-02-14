export default {
    name: "leave",
    description: "Leaving the voice channel",
    aliases: ["dc"],
    optional: {
        inActive: true
    },
    execute: (client, message, ctx) => {
        if (!message.guild.members.me.voice?.channel) return message.reply({ embeds: [ctx.embed().setDescription(`Currently not active in voice channel.`)] });

        if (ctx.player.playing) {
            ctx.player.destroy();
        }
        else {
            ctx.player.disconnect();
        }

        message.reply({ embeds: [ctx.embed().setDescription(`Leaving the voice channel 🔊 \`${message.guild.members.me.voice.channel.name}\``)] });
    }
}