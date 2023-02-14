export default {
    name: "play",
    description: "Playing a song",
    aliases: ["p"],
    optional: {
        voicePermissions: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    args: {
        required: true,
        usage: "song title|song link",
        example: "maroon 5 memories|https://youtu.be/SlPhMPnQ58k"
    },
    execute: async(client, message, ctx) => {
        const query = ctx.args.join(" ");
        const searched = await message.reply(`🔎 Searching \`${query.length > 100 ? query.substr(0, 97)+"..." : query}\``);
        const result = await client.vulkava.search(query).catch(console.error);

        if (!result) return searched.edit(":x: Result not found. Try again!");

        if (result.loadType === "LOAD_FAILED") {
            return searched.edit(`:x: Error! I can't loaded. Because: ${result.exception.message}`);
        }
        else if (result.loadType === "NO_MATCHES") {
            return searched.edit(':x: Nothing matches!');
        }

        const player = client.vulkava.createPlayer({
            guildId: message.guildId,
            voiceChannelId: message.member.voice.channelId,
            textChannelId: message.channelId,
            selfDeaf: true
        });

        player.connect();

        if (result.loadType === 'PLAYLIST_LOADED') {
            for (const track of result.tracks) {
                track.setRequester(message.author);
                player.queue.add(track);
            }

            searched.edit(`Playlist \`${result.playlistInfo.name}\` loaded!`);
        }
        else {
            const track = result.tracks[0];
            track.setRequester(message.author);

            player.queue.add(track);
            searched.edit(`Queued \`${track.title}\``);
        }

        if (!player.playing) player.play();
    }
}