export default {
    name: "resume",
    description: "Resume a song that has been paused",
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];

        if (!ctx.player.paused) {
            message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Current song is already playing." })] }).then(msg => setTimeout(() => msg.delete().catch(o_O => void 0), 5000));
        }
        else {
            if (guildCustom.pausedMessage) {
                guildCustom.pausedMessage.delete().catch(o_O => void 0);
                guildCustom.pausedMessage = null;
            }
            ctx.player.pause(!ctx.player.paused);

            guildCustom.resumedMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Resume the current song`)] }).catch(o_O => void 0);

            setTimeout(() => {
                guildCustom.resumedMessage.delete();
                guildCustom.resumedMessage = null;
            }, 10000);
        }
    }
}