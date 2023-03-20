export default async(client, oldState, newState) => {
    const player = client.vulkava.players.get(newState.guild.id);

    if (!player || player.state !== 1 || !player.playing) return;

    const embed = client.embed();
    const playerChannel = client.channels.cache.get(player.textChannelId);
    const VoiceState = {};

    if (oldState.channel === null && newState.channel !== null) VoiceState.type = "Join";
    if (oldState.channel !== null && newState.channel === null) VoiceState.type = "Leave";
    if (oldState.channel !== null && newState.channel !== null) VoiceState.type = "Move";

    if (oldState.channel === null && newState.channel === null) return;
    if (newState.serverMute == true && oldState.serverMute == false) return player.pause(true);
    if (newState.serverMute == false && oldState.serverMute == true) return player.pause(false);

    if (VoiceState.type === "Move") {
        if (oldState.channel.id === player.voiceChannel) VoiceState.type = "Leave";
        if (newState.channel.id === player.voiceChannel) VoiceState.type = "Join";
    }

    if (VoiceState.type === "Join") VoiceState.channel = newState.channel;
    if (VoiceState.type === "Leave") VoiceState.channel = oldState.channel;

    if (!VoiceState.channel || VoiceState.channel.id !== player.voiceChannel) return;

    VoiceState.members = VoiceState.channel.members.filter((member) => !member.user.bot);

    switch (VoiceState.type) {
        case "Join":
            if (VoiceState.members.size === 1 && player.paused) {
                player.pause(false);
                player.voiceStatePausedMessage.delete().catch(o_O => void 0);

                embed.setTitle(`Queue Resume`)
                    .setDescription(`Resuming playback because all of you left me with music to play all alone.`
                );

                const message = await playerChannel.send({ embeds: [embed] });

                setTimeout(() => message.delete().catch(o_O => void 0), 10000);
            }
            break;
        case "Leave":
            if (VoiceState.members.size === 0 && !player.paused && player.playing) {
                player.pause(true);

                embed.setAuthor(`Queue Paused`)
                    .setDescription(`The player has been paused because everybody left.`);

                const message = await playerChannel.send({ embeds: [embed] });

                player.voiceStatePausedMessage = message;
            }
            break;
    }
};