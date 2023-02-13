import Discord from 'discord.js-selfbot-v13';

import util from 'util';

export default {
    name: "eval",
    description: "Evaluate code for developer testing",
    execute: async(client, message, args) => {
        try {
            let code = args.join(" ");
            if (!args.length) code = 'String("OwO What\'s This?")';

            let evaled = await eval(code);
                evaled = clean(evaled);

            message.reply(`\`\`\`js\n${evaled}\`\`\``);
        }
        catch (error) {
            message.reply(`**❌ Error!**\`\`\`js\n${clean(error)}\n\`\`\``);
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
        return util.inspect(values, { depth: 0 });
    }
};