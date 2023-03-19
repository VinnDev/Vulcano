export default [{
    id: "Primary",
    hostname: process.env.LAVA_HOSTNAME ?? "localhost",
    port: Number(process.env.LAVA_PORT) ? Number(process.env.LAVA_PORT) : 2333,
    password: process.env.LAVA_PASSWORD ?? "youshallnotpass",
    secure: parseBoolean(process.env.LAVA_SECURE),
}]

function parseBoolean(bool = '') {
    switch(bool) {
        case "false":
            return false;
        case "true":
            return true;
        default:
            return false;
    }
}