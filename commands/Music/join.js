export default {
    name: "join",
    description: "Joinned your voice channel",
    optional: {
        voicePermissions: true,
        inActive: true,
        inVoiceChannel: true
    },
    execute: (client, message, ctx) => {
        let content = "";

        if (message.guild.members.me.voice?.channel) {
            if (message.member.voice.channelId === message.guild.members.me.voice.channelId) return message.reply("I already on voice channel with you.");

            content += `Move from \`${message.guild.members.me.voice.channel.name}\` to \`${message.member.voice.channel.name}\` now`;

            ctx.player.setVoiceChannel(message.member.voice.channelId);
        }
        else {
            content += `Joinned \`${message.member.voice.channel.name}\` now`;

            const player = client.vulkava.createPlayer({
                guildId: message.guildId,
                voiceChannelId: message.member.voice.channelId,
                textChannelId: message.channelId,
                selfDeaf: true
            });

            player.connect();
        };

        message.reply(`I have summoned. ${content}`);
    }
}