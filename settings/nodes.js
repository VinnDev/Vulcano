export default [{
    id: "Primary",
    hostname: process.env.LAVA_HOSTNAME ?? "localhost",
    port: process.env.LAVA_PORT ?? 2333,
    password: process.env.LAVA_PASSWORD ?? "youshallnotpass",
    secure: false
}]