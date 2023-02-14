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
            if (message.member.voice.channelId === message.guild.members.me.voice.channelId) return message.reply({ embeds: [ctx.embed({ color: 0xff0000, description: "I already on voice channel with you." })] }).then(msg => setTimeout(() => msg.delete().catch(o_O => void 0), 5000));

            content += `Move from 🔊 \`${message.guild.members.me.voice.channel.name}\` to 🔊 \`${message.member.voice.channel.name}\` now`;

            ctx.player.setVoiceChannel(message.member.voice.channelId);
        }
        else {
            content += `Joinned 🔊 \`${message.member.voice.channel.name}\` now`;

            const player = client.vulkava.createPlayer({
                guildId: message.guildId,
                voiceChannelId: message.member.voice.channelId,
                textChannelId: message.channelId,
                selfDeaf: true
            });

            player.connect();
        };

        message.reply({ embeds: [ctx.embed().setDescription(`I have summoned. ${content}`)] });
    }
}