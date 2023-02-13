export default (client, node, code, reason) => {
    console.error(`[Vulkava] ❌ Node '${node.identifier} Disconnected`, code, reason);
}