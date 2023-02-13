export default (client, message) => {
    if (message.author.bot || !message.content.toLowerCase().startsWith(client.config.prefix.toLowerCase())) return;

    const Context = {};

    Context.args = message.content.trim().slice(client.config.prefix.length).split(/ +/g);
    const cmd = Context.args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(any => any.aliases && any.aliases.includes(cmd));

    if (!command) return;

    if (command.usage && !Context.args.length) {
        const example = `❌ Please input the command arguments! Example: \`${client.prefix}${command.name} [${command.usage.split("|").map(usage => `\`${usage}\``).join(" / ")}]\``;
        
    }

    Context.player = client.vulkava.players.get(message.guildId);
    if (command.optional.isPlaying && !Context.player.playing) return message.reply("There is no track playing.");
    if (command.optional.inVoiceChannel && !message.member.voice?.channel) return message.reply("You are not in a voice channel.");
    if (command.optional.inActive && message.guild.members.me.voice?.channel && Context.player.playing) {
        if (message.guild.members.me.voice?.channel.members.size > 1 && Context.player.requester.id !== message.author.id) return message.reply("I have been active in the voice channel.");
    }
    if (command.optional.sameVoiceChannel && message.member.voice.channelId !== message.guild.members.me.voice.channelId) return message.reply("You are not in a same voice channel with me.");

    try {
        command.execute(client, message, Context);
    }
    catch(error) {
        message.reply(`❌ Error! I can't execute this commands. Because: \`${error.message}\``);
    }
}