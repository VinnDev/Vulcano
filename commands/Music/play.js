export default {
    name: "play",
    description: "Playing a song",
    execute: async(client, message, args) => {
        if (!args.length) return message.reply("Please input the song Title or Link!");

        const query = args.join(" ");
        const result = await client.vulkava.search(query);

        if (result.loadType === "LOAD_FAILED") {
            return message.reply(`:x: Error! I can't loaded. Because: ${result.exception.message}`);
        }
        else if (result.loadType === "NO_MATCHES") {
            return message.reply(':x: Nothing matches!');
        }

        const player = client.vulkava.createPlayer({
            guildId: message.guild.id,
            voiceChannelId: message.member.voice.channelId,
            textChannelId: message.channelId,
            selfDeaf: true
        });

        player.connect(); // Connects to the voice channel

        if (result.loadType === 'PLAYLIST_LOADED') {
            for (const track of result.tracks) {
                track.setRequester(message.author);
                player.queue.add(track);
            }

            message.reply(`Playlist \`${result.playlistInfo.name}\` loaded!`);
        }
        else {
            const track = result.tracks[0];
            track.setRequester(message.author);

            player.queue.add(track);
            message.reply(`Queued \`${track.title}\``);
        }

        if (!player.playing) player.play();
    }
}