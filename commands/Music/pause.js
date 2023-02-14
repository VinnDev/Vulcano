export default {
    name: "pause",
    description: "Pause the current song playing",
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];

        if (ctx.player.paused) {
            message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Current song is already paused." })] }).then(msg => setTimeout(() => msg.delete().catch(o_O => void 0), 5000));
        }
        else {
            ctx.player.pause();

            guildCustom.pausedMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Pause the current song`)] });
        }
    }
}