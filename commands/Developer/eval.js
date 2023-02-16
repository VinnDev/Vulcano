import Discord from "discord.js";

import { inspect } from "util";
import { request } from "undici";

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export default {
    name: "eval",
    description: "Evaluate code for developer testing",
    execute: async(client, message, ctx) => {
        const embed = new Discord.EmbedBuilder({ color: Discord.Colors.Blue });
        const code = ctx.args.join(" ");

        try {
            if (!ctx.args.length) return message.react("❌");

            let evaled = await eval(code);
                evaled = clean(evaled);

            embed.setDescription(`\`\`\`js\n${evaled}\`\`\``);

            message.reply({ embeds: [embed] });
        }
        catch (error) {
            embed.setColor(Discord.Colors.Red);
            embed.setDescription(`**❌ Error!**\`\`\`js\n${clean(error)}\n\`\`\``);

            message.reply({ embeds: [embed] });
        }
    }
};

function clean(values) {
    if  (typeof values === "string") {
        return values
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    }
    else {
        return inspect(values, { depth: 0 });
    }
};