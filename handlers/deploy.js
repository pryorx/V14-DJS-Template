const chalk = require('chalk');
const { REST, Routes } = require("discord.js");
const ExtendedClient = require("../structures/ExtendedClient");
const config = require("../structures/config");
const { log, isSnowflake } = require("../structures/functions");

/**
 *
 * @param {ExtendedClient} client
 */
module.exports = async (client) => {
    const rest = new REST({ version: "10" }).setToken(
        process.env.CLIENT_TOKEN || config.client.token
    );

    try {
console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('Started loading application commands... (this might take seconds!)'));
        
        const guildId = process.env.GUILD_ID || config.development.guild;

        if (config.development && config.development.enabled && guildId) {
            if (!isSnowflake(guildId)) {
                console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.red('Guild ID is missing. Please set it in .env or config file or disable development in the config'));
                return;
            }

            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID || config.client.id, guildId), {
                    body: client.applicationcommandsArray,
                }
            );

            console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green(`Successfully loaded application commands to guild ${guildId}`));
        } else {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID || config.client.id), {
                    body: client.applicationcommandsArray,
                }
            );

            console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('Successfully loaded application commands globally to Discord API'));
        }
    } catch (e) {
        console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.red(`Unable to load application commands to Discord API: ${e.message}`));
    }
};
