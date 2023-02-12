import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Vulkava } from "vulkava";
import { readdirSync } from "fs";

import config from "../settings/config.js";
import nodes from "../settings/nodes.js";

export default class MusicBot extends Client {
    constructor() {
        super({
            allowedMentions: {
                parse: ["roles", "users"],
                repliedUser: false,
            },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ]
        });

        this.config = config;
        this.commands = new Collection();

        this.vulkava = new Vulkava({
            nodes,
            sendWS: (guild, payload) => {
                this.guilds.cache.get(guild)?.shard.send(payload);
            }
        });
        this.vulkava.on("error", (node, error) => console.log(`[Vulkava] Node ${node.identifier} Error!`, error));
        this.vulkava.on("warn", (node, info) => console.log(`[Vulkava] Node ${node.identifier} Warning!`, info));

        this.on("error", console.log);
        this.on("warn", console.log);
    }
    loadCommands() {
        console.log("[Info] Start reload 'commands'")

        readdirSync("./commands").forEach(folder => {
            readdirSync(`./commands/${folder}`).forEach(async(file) => {
                const command = (await import(`../commands/${folder}/${file}`)).default;
                command.category = folder;

                this.commands.set(command.name, command);
           });
        });

        console.log("[Info] ✅ 'commands' has loaded");
    }
    loadEvents() {
        console.log("[Info] Start reload 'events'");

        readdirSync("./events").forEach(folder => {
            readdirSync(`./events/${folder}`).forEach(async(file) => {
                switch(folder) {
                    case "Client": {
                        const event = (await import(`../events/Client/${file}`)).default;

                        this.on(file.split(".")[0], event.bind(null, this));
                        break;
                    }
                    case "Vulkava": {
                        const event = (await import(`../events/Vulkava/${file}`)).default;

                        this.vulkava.on(file.split(".")[0], event.bind(null, this));
                        break;
                    }
                }
            });
        });

        console.log("[Info] ✅ 'events' has loaded");
    }
    async setup() {
        this.loadCommands();
        this.loadEvents();

        super.login(process.env.TOKEN);
    }
}