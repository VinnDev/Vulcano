export default {
    name: "loop",
    description: "Togle of looping song track or song queue",
    aliases: ["l", "repeat"],
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: (client, message, ctx) => {
        const state = ctx.player.queueRepeat;

        ctx.player.setQueueLoop(!state);

        message.reply({ embeds: [ctx.embed().setDescription(`Loop is \`${state ? "off" : "on"}\` now`)] });
    }
}