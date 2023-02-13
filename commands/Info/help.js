import { EmbedBuilder } from "discord.js";
import { readdirSync } from "node:fs";

export default {
    name: "help",
    description: "Show help commands information",
    aliases: ["h", "command", "cmd"],
    execute: (client, message) => {
        const categories = readdirSync("./commands").filter(category => category !== "Developer");

        const embed = new EmbedBuilder()
            .setColor(client.config.colors)
            .setAuthor({ title: "Help Commands", iconURL: client.user.displayAvatarURL({ dynamic: true, size: 256 }) })
            .setDescription("Here is my commands list.");

        categories.forEach(category => {
            embed.addFields({ name: category, value: client.commands.filter(command => command.category === category).map(cmd => `\`${cmd.name}\``).join(" ")});
        });

        message.reply({ embeds: [embed] });
    }
}