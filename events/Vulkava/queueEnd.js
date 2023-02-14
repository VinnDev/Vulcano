export default (client, player) => {
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send({ embeds: [{ color: parseInt(client.config.colors.replace("#", "0x")), description: "Queue ended!" }] });
}