export default {
    name: "nowplaying",
    description: "Display the song currently playing",
    aliases: ["now", "np"],
    optional: {
        isPlaying: true
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];
        const song = ctx.player.current;

        if (guildCustom.nowPlayingMessage) {
            guildCustom.nowPlayingMessage.delete().catch(o_O => void 0);
            guildCustom.nowPlayingMessage = null;
        }

        guildCustom.nowPlayingMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Now playing [${song.title}](${song.uri})`).setFooter({ text: `Played by ${song.requester.tag}` })] });
    }
}