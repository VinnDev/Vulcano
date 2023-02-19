import Lyrics from "lyrics-api.js";

export default {
    name: "lyrics",
    description: "Searching the song lyrics",
    args: {
        required: false,
        usage: "query",
        example: "maroon 5 sugar"
    },
    aliases: ["ly"],
    execute: async(client, message, ctx) => {
        let query = ctx.args.join(" ");

        try {
            if (!query.length || !ctx.player || !ctx.player.playing) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: `What lyrics are you looking for?` })] })
            if (ctx.player) {
                if (ctx.player.playing) query = ctx.player.current.title
            };

            const lyrics = await Lyrics.search(query);
            if (!lyrics || !lyrics.data) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description:`I cannot find lyrics for \`${query}\`` })] });

            const result = lyrics.data;

            const embed = ctx.embed()
                .setTitle(result.title)
                .setAuthor({ name: result.artists.map(artist => artist.name).join(", ") })
                .setThumbnail(result.thumbnail)
                .setDescription(result.lyrics.length > 4096 ? `${result.lyrics.substr(0, 4093)}...`: result.lyrics)
                .setFooter({ text: `Lyrics provided by ${lyrics.provider}` });

            message.reply({ embeds: [embed] });
        } catch(error) {
            console.log(error);
            message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "I cannot find the lyrics! cause something happen." })] });
        }
    }
}