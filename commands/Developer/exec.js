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
    execute: (client, message, ctx) => {
        message.channel.sendTyping();
        const executed = execSync(ctx.args.join(" "));

        if (!executed) {
            message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: `I cannot executed a shell command of \`${ctx.args.join(" ")}\`` })] });
        }
        else {
            message.reply({ embeds: [ctx.embed({ color: 0x00ff00, title: `$ ${ctx.args.join(" ")}`, description: `\`\`\`shell\n${executed}\`\`\`` })] });
        }
    }
}