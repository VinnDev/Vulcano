import { Client, Collection, EmbedBuilder, GatewayIntentBits } from "discord.js";
import { Vulkava } from "vulkava";
import { readdirSync } from "node:fs";

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
        this.vulkava.on("error", (node, error) => {
            console.error(`[Vulkava] ❌ Node ${node.identifier} Error!`, error);
        });
        this.vulkava.on("warn", (node, info) => {
            console.warn(`[Vulkava] ❗ Node ${node.identifier} Warning!`, info);
        });

        this.on("error", (error) => {
            console.error(error);
        });
        this.on("warn", (info) => {
            console.warn(info);
        });

        process.on('unhandledRejection', error => {
            console.error('Unhandled Promise Rejection:', error);
        });
        process.on('uncaughtException', error => {
            console.error('Uncaught Exception:', error);
        });
    }
    embed(options = {}) {
        if (!options.color) options.color = parseInt(config.colors.replace("#", "0x"));
        return new EmbedBuilder(options);
    }
    loadCommands() {
        console.log("[Info] Start reload 'commands'")

        readdirSync("./commands").forEach(folder => {
            readdirSync(`./commands/${folder}`).forEach(async(file) => {
                const commands = (await import(`../commands/${folder}/${file}`)).default;

                const command = {
                    name: commands.name,
                    category: folder,
                    description: commands.description,
                    aliases: commands.aliases || [],
                    optional: commands.optional || {},
                    args: commands.args || {},
                    usage: commands.usage || null,
                    execute: commands.execute
                };

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