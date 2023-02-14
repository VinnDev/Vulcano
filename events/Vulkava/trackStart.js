export default (client, player, track) => {
    if (player.message) {
        player.message.delete().catch(o_O => void 0);
        player.message = null;
    };

    const channel = client.channels.cache.get(player.textChannelId);

    channel.send({ embeds: [client.embed({ description: `Start playing [${track.title}](${track.uri})` })] }).then(message => player.message = message);
}