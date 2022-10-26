const fs = require('node:fs');
const path = require('node:path');

const eventsDir = path.join(__dirname, 'events');

module.exports.events = fs.readdirSync(eventsDir)
    .filter((file) => file.endsWith('.js'))
    .map((file) => require(path.join(eventsDir, file)));
