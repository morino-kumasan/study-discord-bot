const fs = require('node:fs');
const path = require('node:path');

const commandsDir = path.join(__dirname, 'commands');

module.exports.slashCommands = fs.readdirSync(commandsDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => require(path.join(commandsDir, file)));
