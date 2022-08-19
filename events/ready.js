module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log(`Client ${client.user.tag} is ready!`);
    }
};