export default (client, player, track) => {
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send({ embeds: [{ color: parseInt(client.config.colors.replace("#", "0x")), description: `Start playing [${track.title}](${track.uri})` }] });
}