export default (client, player, track) => {
    if (player.message) player.message.delete().catch(o_O => void 0);

    const channel = client.channels.cache.get(player.textChannelId);

    player.message = await channel.send({ embeds: [client.embed({ description: `Start playing [${track.title}](${track.uri})` })] });
}