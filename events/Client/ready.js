const chalk = require('chalk');
const { log } = require("../../structures/functions");
const ExtendedClient = require('../../structures/ExtendedClient');

module.exports = {
    event: 'ready',
    once: true,
    /**
     * 
     * @param {ExtendedClient} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
    run: (_, client) => {

        console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('Logged in as: ' + client.user.tag));

    }
};
