export default {
    name: "skip",
    description: "Skip the song current playing",
    aliases: ["s"],
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: (client, message, ctx) => {
        if (ctx.player.queue.size === 0) {
            ctx.player.destroy();

            message.react("👌🏻");
        }
        else {
            const song = ctx.player.current;
            ctx.player.skip();

            message.reply(`Skipped **${song.title}**`);
        }
    }
}