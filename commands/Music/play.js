export default {
    name: "play",
    description: "Start playing a song",
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
        let searchInfo = `🔎 Searching \`${query.length > 100 ? query.substr(0, 97)+"..." : query}\``;

        const searched = await message.reply(searchInfo);
        const result = await client.vulkava.search(query).catch(console.error);

        if (!result) {
            searchInfo += " is **Failed!**"
            return searched.edit({ content: searchInfo, embeds: [ctx.embed({ color: 0xff0000, description: ":x: Result not found. Try again!" })] });
        }

        if (result.loadType === "LOAD_FAILED") {
            searchInfo += " is **Failed!**";
            return searched.edit({ content: searchInfo, embeds: [ctx.embed({ color: 0xff0000, description: `:x: Error! I can't loaded. cause: ${result.exception.message}` })] });
        }
        else if (result.loadType === "NO_MATCHES") {
            searchInfo += " is **Failed!**";
            return searched.edit({ content: searchInfo, embeds: [ctx.embed({ color: 0xff0000, description: ':x: Nothing matches!'})] });
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

            searched.edit({ content: "", embeds: [ctx.embed().setDescription(`Playlist \`${result.playlistInfo.name}\` **loaded**]`)] });
        }
        else {
            const track = result.tracks[0];
            track.setRequester(message.author);

            player.queue.add(track);
            searched.edit({ content: "", embeds: [ctx.embed().setDescription(`Queued \`${track.title}\``)] });
        }

        if (!player.playing) player.play();
    }
}