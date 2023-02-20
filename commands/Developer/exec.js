import { execSync } from "node:child_process";

export default {
    name: "exec",
    description: "Execute a shell command",
    aliases: ["$", ">"],
    args: {
        required: true,
        usage: "shell_command",
        example: "npm ls|node -version"
    },
    execute: async(client, message, ctx) => {
        await message.channel.sendTyping();

        try {
            const executed = execSync(ctx.args.join(" "));

            message.reply({ embeds: [ctx.embed({ color: 0x00ff00, title: `$ ${ctx.args.join(" ")}`, description: `\`\`\`shell\n${executed}\`\`\`` })] });
        }
        catch(error) {
            message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: `I cannot executed $ \`${ctx.args.join(" ")}\` command. cause: ${error.message}` })] });
        }
    }
}