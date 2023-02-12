export default (client, player, track) => {
    const channel = client.channels.cache.get(player.textChannelId);

    channel.send(`Start playing **${track.title}**`);
}