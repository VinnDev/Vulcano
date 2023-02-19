export default [{
    id: "Primary",
    hostname: process.env.LAVA_HOSTNAME ?? "localhost",
    port: validateNumber(process.env.LAVA_PORT) || 2333,
    password: process.env.LAVA_PASSWORD ?? "youshallnotpass",
    secure: false
}]

function validateNumber(value) {
    value = parseInt(value);

    if (!value) throw "Error at here! You must check and setup enviroment value must Number";
    return value;
}