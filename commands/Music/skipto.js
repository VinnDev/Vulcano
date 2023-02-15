export default {
    name: "skipto",
    description: "Skip the current song playing to a queued selection",
    aliases: ["st"],
    args: {
        required: true,
        usage: "number",
        example: "2"
    },
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];
        if (guildCustom.skiptoMessage) {
            guildCustom.skiptoMessage.delete().catch(o_O => void 0);
            guildCustom.skiptoMessage = null;
        }

        const selection = Number(ctx.args[0]);

        if (isNaN(selection)) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Please input a valid number!" })] });

        if (ctx.player.queue.size === 0) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Song queue is empty!" })] });

        if (selection < 1) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Input number is less than 1." })] });

        if (selection > ctx.player.queue.size) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Input number is higher than the queued available." })] });

        const song = ctx.player.queue.tracks[selection - 1];
        ctx.player.skip(selection - 1);

        guildCustom.skiptoMessage = await message.reply({ embeds: [ctx.embed().setDescription(`Skipped to \`${song.title}]\``)] });
    }
}