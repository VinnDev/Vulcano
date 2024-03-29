import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

const GuildCollection = {};

export default (client, message) => {
    if (message.author.bot || !message.content.toLowerCase().startsWith(client.config.prefix.toLowerCase())) return;

    const Context = {};

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.config.prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    Context.args = message.content.trim().slice(matchedPrefix.length).split(/ +/g);
    const cmd = Context.args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(any => any.aliases && any.aliases.includes(cmd));

    if (!command) return;

    const embed = new EmbedBuilder({ color: 0xFF0000 });

    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return message.author.send({ embeds: [embed.setDescription(`I don't have permissions \`SendMessages\` at channel ${message.channel.toString()} in server **${message.guild.name}**`)] }).catch(o_O => void 0);
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks)) return message.channel.send(`I need permissions \`EmbedLinks\` to execute my commands!`);

    Context.player = client.vulkava.players.get(message.guildId);

    if (command.category === "Developer" && message.author.id !== client.config.developerId) return;

    if (command.optional.isPlaying && !Context.player) {
        return message.reply({ embeds: [embed.setDescription("There is no track playing.")] });
    }
    else {
        if (command.optional.isPlaying && !Context.player.playing) return message.reply({ embeds: [embed.setDescription("There is no track playing.")] });
        if (command.optional.isPlaying && !Context.player.current) return message.reply({ embeds: [embed.setDescription("There is no track playing.")] });
    }
    if (command.optional.inVoiceChannel && !message.member.voice?.channel) return message.reply({ embeds: [embed.setDescription("You are not in a voice channel.")] });
    else if (command.optional.voicePermissions && !message.member.voice.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.Connect)) return message.reply({ embeds: [embed.setDescription(`I need permissions \`Connect\` in **${message.member.voice.channel.name}**`)] });
    else if (command.optional.voicePermissions && !message.member.voice.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.Speak)) return message.reply({ embeds: [embed.setDescription(`I need permissions \`Speak\` in **${message.member.voice.channel.name}**`)] });
    if (command.optional.inActive && message.guild.members.me.voice?.channel && Context.player) {
        if (message.guild.members.me.voice?.channel.members.size > 1 && Context.player.playing && Context.player.current.requester.id !== message.author.id) return message.reply({ embeds: [embed.setDescription("I have been active in the voice channel.")] });
    }
    if (command.optional.sameVoiceChannel && message.guild.members.me.voice?.channel && message.member.voice.channelId !== message.guild.members.me.voice.channelId) return message.reply({ embeds: [embed.setDescription("You are not in a same voice channel with me.")] });

    if (command.args.required && !Context.args.length) {
        return message.reply({ embeds: [embed.setDescription("Please input a command arguments!").addFields({ name: "Usage", value: `${command.args.usage.split("|").map(usage => `\`${usage}\``).join(" | ")}\n\nExample: ${command.args.example.split("|").map(ex => `\`${client.config.prefix}${command.name} ${ex}\``).join(" | ")}` })] });
    }

    try {
        Context.embed = client.embed;
        Context[message.guildId] = GuildCollection;

        command.execute(client, message, Context);
    }
    catch(error) {
        message.reply({ embeds: [embed.setDescription(`❌ I cannot execute this commands. cause: \`${error.message}\``)] });
    }
}