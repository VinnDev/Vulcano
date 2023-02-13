export default {
    name: "stop",
    description: "Forcibly stop the song and clear song queue",
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: (client, message, ctx) => {
        ctx.player.destroy();

        message.react("🛑");
    }
}