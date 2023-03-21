export default async(client, oldState, newState) => {
    const player = client.vulkava.players.get(newState.guild.id);

    if (!player || player.state !== 1) return;

    const embed = client.embed();
    const VoiceState = {};

    if (oldState.channel === null && newState.channel !== null) VoiceState.type = "Join";
    if (oldState.channel !== null && newState.channel === null) VoiceState.type = "Leave";
    if (oldState.channel !== null && newState.channel !== null) VoiceState.type = "Move";

    if (oldState.channel === null && newState.channel === null) return;
    if (newState.serverMute == true && oldState.serverMute == false) return player.pause(true);
    if (newState.serverMute == false && oldState.serverMute == true) return player.pause(false);

    if (VoiceState.type === "Move") {
        if (oldState.channel.id === player.voiceChannelId) VoiceState.type = "Leave";
        if (newState.channel.id === player.voiceChannelId) VoiceState.type = "Join";
    }

    if (VoiceState.type === "Join") VoiceState.channel = newState.channel;
    if (VoiceState.type === "Leave") VoiceState.channel = oldState.channel;

    if (!VoiceState.channel || VoiceState.channel.id !== player.voiceChannelId) return;

    VoiceState.members = VoiceState.channel.members.filter((member) => !member.user.bot);

    switch (VoiceState.type) {
        case "Join":
            if (VoiceState.members.size === 1 && player.paused) {
                player.pause(false);
                player.voiceStatePausedMessage.delete().catch(o_O => void 0);

                embed.setTitle("Music Resume")
                    .setDescription(`Resuming song playback. Cause, someone joined **[${VoiceState.channel.name}](${VoiceState.channel.url})**.`);

                const message = await player.message.reply({ embeds: [embed] });

                setTimeout(() => message.delete().catch(o_O => void 0), 10000);
            }
            break;
        case "Leave":
            if (oldState.channelId && !newState.channelId && newState.id === client.user.id && player.playing) {
                embed.setColor('Red')
                    .setDescription("I have been kicked from the voice channel :slight_frown:");

                playingChannel.send({ embeds: [embed] });
            }
            if (VoiceState.members.size === 0 && !player.paused && player.playing) {
                player.pause(true);

                embed.setColor("LightGrey")
                    .setTitle("Music Paused")
                    .setDescription(`Current song has been paused! Cause, everybody out **[${VoiceState.channel.name}](${VoiceState.channel.url})**.`);

                const message = await player.message.reply({ embeds: [embed] });

                player.voiceStatePausedMessage = message;
            }
            break;
    }
};