export default {
    name: "skip",
    description: "Skip the current song playing",
    aliases: ["s"],
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];
        if (guildCustom.skipMessage) {
            guildCustom.skipMessage.delete().catch(o_O => void 0);
            guildCustom.skipMessage = null;
        }

        if (ctx.player.queue.size === 0) {
            ctx.player.destroy();

            message.react("👌🏻");
        }
        else {
            const song = ctx.player.current;
            ctx.player.skip();

            guildCustom.skipMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Skipped \`${song.title}]\``)] });
        }
    }
}