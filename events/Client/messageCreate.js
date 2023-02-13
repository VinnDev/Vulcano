export default (client, message) => {
    if (message.author.bot || !message.content.toLowerCase().startsWith(client.config.prefix.toLowerCase())) return;

    const args = message.content.trim().slice(client.config.prefix.length).split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(any => any.aliases && any.aliases.includes(cmd));

    if (!command) return;

    try {
        command.execute(client, message, args);
    }
    catch(error) {
        message.reply(`❌ Error! I can't execute this commands. Because: \`${error.message}\``);
    }
}