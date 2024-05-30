require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios');
// Check if is up to date
const { version } = require('./package.json');
axios.get('https://api.github.com/repos/pryorx/V14-DJS-Template/releases/latest').then(res => {
    if (res.data.tag_name !== version) {
        console.log(chalk.red.bgYellow(`Your bot is not up to date! Please update to the latest version!`, version + ' -> ' + res.data.tag_name));
    }
}).catch(err => {
    console.log(chalk.red.bgYellow(`Failed to check if bot is up to date!`));
});
    console.clear();
    console.log(chalk.blue(chalk.bold(`System`)), chalk.white(`>>`), chalk.green(`Starting up`), chalk.white(`...`));
    console.log(`\u001b[0m`);
    console.log(chalk.red(`Â© ByteN3X | 2024 - ${new Date().getFullYear()}`));
    console.log(chalk.red(`All rights reserved`));
    console.log(chalk.red(`Join our discord: https://discord.gg/3MvjKZRC2A`));
    console.log(`\u001b[0m`);
    console.log(`\u001b[0m`);
    console.log(chalk.blue(chalk.bold(`System`)), chalk.white(`>>`), chalk.red(`Version ${require(`${process.cwd()}/package.json`).version}`), chalk.green(`loaded`));
    console.log(`\u001b[0m`);

const ExtendedClient = require('./structures/ExtendedClient');
const client = new ExtendedClient();
client.start();


// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
