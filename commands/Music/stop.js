export default {
    name: "stop",
    description: "Forcibly stop current song and clear queue",
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