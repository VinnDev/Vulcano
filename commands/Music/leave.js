export default {
    name: "leave",
    description: "Leaving the voice channel",
    aliases: ["dc"],
    optional: {
        inActive: true
    },
    execute: (client, message, ctx) => {
        if (!ctx.player) return;
        if (!message.guild.members.me.voice?.channel) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Currently is not active in voice channel." })] });

        ctx.player.destroy();

        message.reply({ embeds: [ctx.embed().setDescription(`Leaving the voice channel 🔊 \`${message.guild.members.me.voice.channel.name}\``)] });
    }
}