const { Client, Partials, Collection } = require("discord.js");
const config = require('./config');
const commands = require("../handlers/commands");
const events = require("../handlers/events");
const deploy = require("../handlers/deploy");
const mongoose = require("./models/connect");

module.exports = class extends Client {
    collection = {
        interactioncommands: new Collection(),
        prefixcommands: new Collection(),
        aliases: new Collection(),
    };
    applicationcommandsArray = [];

    constructor() {
        super({
            intents: 3276799, // Every intent
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
                Partials.ThreadMember
            ]
        });
    }

    async start() {
        commands(this);
        events(this);

        if (config.handler.mongodb.enabled) mongoose();

        await this.login(process.env.CLIENT_TOKEN || config.client.token);

        if (config.handler.deploy) deploy(this, config);

        /*
          different types for statuses can be a number and they as follows:
          Playing: 0
          Streaming: 1
          Listening: 2
          Watching: 3
          Competing: 5
              
          Want a changing status? Just change line 56 to `status: obj[key].status` and insert your own status into each object below.
          Different statuses include "online", "idle", "dnd", and "invisible"
        */
        const acts = [
            {
                name: "Made By -> discord.gg/3MvjKZRC2A",
                type: 5,
                status: "dnd",
            },
            {
                name: `over ${this.guilds.cache.size} guild(s)`,
                type: 3,
                status: "idle",
            }
        ];

        setInterval(async () => {
            const currentAct = acts.shift();
            this.user.setPresence({
                activities: [
                    {
                        name: currentAct.name.toString(),
                        type: currentAct.type,
                    },
                ],
                status: currentAct.status,
                /**
                 * Don't want a changing status? Just change the line above to `status: "status"`. Different statuses include "online", "idle", "dnd", and "invisible"
                 */
            });
            acts.push(currentAct);
        }, 15000);
    }
};
