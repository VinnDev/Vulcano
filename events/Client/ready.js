import { ActivityType } from "discord.js";

export default (client) => {
    client.vulkava.start(client.user.id);

    client.user.setActivity({
        name: `${client.config.prefix}help | Made by Vinn#6779`,
        type: ActivityType.Listening
    });

    console.log(`[Client] Bot Ready as ${client.user.tag}`);
}