export default (client, player) => {
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send("Queue ended!");
}