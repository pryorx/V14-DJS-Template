const chalk = require('chalk');
const { readdirSync } = require('fs');
const ExtendedClient = require('../structures/ExtendedClient');
const path = require('path');

/**
 * 
 * @param {ExtendedClient} client 
 */
module.exports = (client) => {
    const commandsDir = path.join(__dirname, '../commands');

    console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('Loading commands'), chalk.white('...'));

    for (const type of readdirSync(commandsDir)) {
        const typeDir = path.join(commandsDir, type);
        for (const dir of readdirSync(typeDir)) {
            const dirPath = path.join(commandsDir, type, dir);
            for (const file of readdirSync(dirPath).filter((f) => f.endsWith('.js'))) {
                const module = require(path.join(commandsDir, type, dir, file));

                if (!module) continue;

                if (type === 'prefix') {
                    if (!module.structure?.name || !module.run) {
                        console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.yellow('Unable to load the command ' + file + ' due to missing \'structure#name\' or/and \'run\' properties'));
                        continue;
                    }

                    client.collection.prefixcommands.set(module.structure.name, module);

                    if (module.structure.aliases && Array.isArray(module.structure.aliases)) {
                        module.structure.aliases.forEach((alias) => {
                            client.collection.aliases.set(alias, module.structure.name);
                        });
                    }
                } else {
                    if (!module.structure?.name || !module.run) {
                        console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.yellow('Unable to load the command ' + file + ' due to missing \'structure#name\' or/and \'run\' properties'));
                        continue;
                    }

                    client.collection.interactioncommands.set(module.structure.name, module);
                    client.applicationcommandsArray.push(module.structure);
                }

                console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('Loaded new command: ' + file));
            }
        }
    }

    console.log('\u001b[0m');
};
