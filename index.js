import MusicBot from "./structures/Client.js";

const client = new MusicBot();

process.on('unhandledRejection', error => {
    console.error('Unhandled Promise Rejection:', error);
});
process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
});

client.setup();

export default client;