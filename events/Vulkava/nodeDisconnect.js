export default (client, node, code, reason) => {
    console.log(`[Vulkava] ❌ Node '${node.identifier} Disconnected`, code, reason);
}