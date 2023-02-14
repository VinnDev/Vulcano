import { EmbedBuilder } from "discord.js";
import { readdirSync } from "node:fs";

export default {
    name: "help",
    description: "Show help commands information",
    aliases: ["h", "command", "cmd"],
    args: {
        required: false,
        usage: "commands",
        example: "help|play"
    },
    execute: (client, message, ctx) => {
        const embed = new EmbedBuilder()
            .setColor(client.config.colors);

        if (!ctx.args.length) {
            const categories = readdirSync("./commands").filter(category => category !== "Developer");

            embed.setAuthor({ name: "Commands List", iconURL: message.author.displayAvatarURL({ dynamic: true, size: 512 }) })
                .setDescription(`Here is all my commands list. Use \`${client.config.prefix}help [commands]\` for more info command spesific.`);

            categories.forEach(category => {
                embed.addFields({ name: category, value: client.commands.filter(command => command.category === category).map(cmd => `\`${cmd.name}\``).join(" ") });
            });

            message.reply({ embeds: [embed] });
        }
        else {
            const command = client.commands.get(ctx.args[0]) || client.commands.find(command => command.aliases.length && command.aliases.includes(ctx.args[0]));

            if (!command) return message.reply({ embeds: [embed.setDescription("I cannot find that commands!")] });

            embed.setTitle(`"${command.name}" commands`)
                .setDescription(command.description)

            if (command.aliases.length) {
                embed.addFields({ name: "Alias", value: command.aliases.map(alias => `\`${alias}\``).join(", ")})
            }

            if (command.args.usage) {
                embed.addFields({ name: "Usage", value: `${command.args.usage.split("|").map(usage => `\`${usage}\``).join(" | ")}\n\nExample: ${command.args.example.split("|").map(ex => `\`${client.config.prefix}${command.name} ${ex}\``).join(" | ")}` });
            }

            message.reply({ embeds: [embed] });
        }
    }
}