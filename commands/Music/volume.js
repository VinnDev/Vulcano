export default {
    name: "volume",
    description: "Adjust the sounds volume",
    aliases: ["v"],
    args: {
        required: true,
        usage: "number",
        exampe: "50"
    },
    optional: {
        isPlaying: true,
        inVoiceChannel: true,
        sameVoiceChannel: true
    },
    execute: (client, message, ctx) => {
        const value = Number(ctx.args[0]);

        if (isNaN(value)) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Input volume value must be valid number."})] });

        if (value < 1 || value > 100) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "Input volume value must a number between 1 - 100!"})] });

        ctx.player.filters.setVolume(value);

        message.reply({ embeds: [ctx.embed().setDescription(`Volume is set to \`${value}%\``)] });
    }
}