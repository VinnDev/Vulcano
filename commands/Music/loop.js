export default {
    name: "loop",
    description: "Togle of looping song track or song queue",
    aliases: ["l", "repeat"],
    args: {
        required: false,
        usage: "optional",
        example: "single|queue"
    },
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];
        const state = {
            single: ctx.player.trackRepeat,
            queue: ctx.player.queueRepeat
        };

        if (guildCustom.loopMessage) {
            guildCustom.loopMessage.delete().catch(o_O => void 0);
            guildCustom.loopMessage = null;
        }

        const singleLoop = async() => {
            if (state.queue) ctx.player.setQueueLoop(false);
            ctx.player.setTrackLoop(!state.single);

            guildCustom.loopMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Single loop is \`${state.single ? "NOT ACTIVE" : "ACTIVE"}\` now`)] });
        };
        const queueLoop = async() => {
            if (state.single) ctx.player.setTrackLoop(false);
            ctx.player.setQueueLoop(!state.queue);

            guildCustom.loopMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Queue loop is \`${state.queue ? "NOT ACTIVE" : "ACTIVE"}\` now`)] });
        };

        if (!ctx.args.length) return singleLoop(); // Default is single looping

        switch(ctx.args[0].toUpperCase()) {
            case "SINGLE": {
                singleLoop();
                break;
            }
            case "QUEUE": {
                queueLoop();
                break;
            }
        }
    }
}