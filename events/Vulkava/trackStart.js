export default async (client, player, track) => {
    await client.setupTrackStart(player);

    const channel = client.channels.cache.get(player.textChannelId);

    player.message = await channel.send({ embeds: [client.embed({ description: `Start playing [${track.title}](${track.uri})` })] }).then(message => player.setupMessage(message));
}