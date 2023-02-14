export default {
    name: "queue",
    description: "Show the songs queue",
    optional: {
        isPlaying: true
    },
    execute: async(client, message, ctx) => {
        const guildCustom = ctx[message.guildId];
        if (guildCustom.queueMessage) {
            guildCustom.queueMessage.delete().catch(o_O => void 0);
            guildCustom.queueMessage = null;
        }

        const embed = ctx.embed();
        const queue = ctx.player.queue;
        const song = ctx.player.current;
        const currentPlaying = `Current playing [${song.title}](${song.uri})`;

        if (queue.size === 0) {
            embed.setDescription(`${currentPlaying}\n\n- Song queue is empty!`);

            guildCustom.queueMessage = await message.reply({ embeds: [embed] });
        }
        else {
            embed.setDescription(`${currentPlaying}\n\n${queue.tracks.slice(0, 10).map((track, i=1) => `[${i++}.] [${track.title}](${track.uri}) (${track.requester.toString()}`)})`);

            guildCustom.queueMessage = await message.reply({ embeds: [embed] });
        }
    }
}