const { readdirSync } = require('fs');
const chalk = require('chalk');
const ExtendedClient = require('../structures/ExtendedClient');
const path = require('path');

/**
 * 
 * @param {ExtendedClient} client 
 */
module.exports = (client) => {
    const eventsDir = path.join(__dirname, '../events');

    console.log(chalk.blue.bold('System'), chalk.white('>>'), chalk.green('Loading events'), chalk.white('...'));

    for (const dir of readdirSync(eventsDir)) {
        const dirPath = path.join(eventsDir, dir);
        for (const file of readdirSync(dirPath).filter((f) => f.endsWith('.js'))) {
            const module = require(path.join(eventsDir, dir, file));

            if (!module) continue;

            if (!module.event || !module.run) {
                console.log(chalk.yellow('Unable to load the event ' + file + ' due to missing \'name\' or/and \'run\' properties'));
                continue;
            }

            console.log(chalk.green('Loaded new event: ' + file));

            if (module.once) {
                client.once(module.event, (...args) => module.run(client, ...args));
            } else {
                client.on(module.event, (...args) => module.run(client, ...args));
            }
        }
    }

    console.log('\u001b[0m');
};
