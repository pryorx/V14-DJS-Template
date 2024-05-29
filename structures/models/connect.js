const chalk = require('chalk');
const { connect } = require("mongoose");
const config = require("../config");
const { log } = require("../functions");

module.exports = async () => {
    console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('Started connecting to MongoDB...'));

    await connect(process.env.MONGODB_URI || config.handler.mongodb.uri).then(() => {
        console.log(chalk.blue(chalk.bold('System')), chalk.white('>>'), chalk.green('MongoDB is connected to the atlas!'));
    });
};
