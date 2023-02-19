export default [{
    id: "Primary",
    hostname: process.env.LAVA_HOSTNAME ?? "localhost",
    port: Number(process.env.LAVA_PORT) ? Number(process.env.LAVA_PORT) : 2333,
    password: process.env.LAVA_PASSWORD ?? "youshallnotpass",
    secure: false
}]