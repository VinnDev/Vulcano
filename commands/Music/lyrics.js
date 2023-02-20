import searchLyrics from "../../functions/searchLyrics.js";

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

        if (!ctx.args.length && !ctx.player) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: `What lyrics are you looking for?` })] });

        if (!ctx.args.length) {
            if (ctx.player.playing) query = ctx.player.current.title;
            else {
                return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: `What lyrics are you looking for?` })] });
            }
        };

        await message.channel.sendTyping();

        try {
            let data = null;
            let lyrics = await searchLyrics(query);

            if (!lyrics || !lyrics.data) {
                return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description:`I cannot find lyrics for \`${query}\`` })] });
            };
            data = lyrics.data;

            const embed = ctx.embed()
                .setTitle(data.title)
                .setAuthor({ name: data.artists.map(artist => artist.name).join(", ") })
                .setThumbnail(data.thumbnail)
                .setDescription(data.lyrics.length > 4096 ? `${data.lyrics.substr(0, 4093)}...`: data.lyrics)
                .setFooter({ text: `Source: ${data.source} | Powered by ${lyrics.provider.name}` });

            message.reply({ embeds: [embed] });
        } catch(error) {
            console.log(error);
            message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "I cannot find the lyrics! cause something happen." })] });
        }
    }
}