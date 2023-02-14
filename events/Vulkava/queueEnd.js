export default (client, player) => {
    player.destroy();

    const channel = client.channels.cache.get(player.textChannelId);

    channel.send({ embeds: [client.embed({ description: "Queue ended!" })] });
}