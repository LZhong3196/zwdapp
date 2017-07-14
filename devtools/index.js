var FS = require("fs");
var Path = require("path");
var Optimist = require('optimist');

var Command = require("./helpers/command");

var command = Optimist.argv._[0];

if (!command) {
    command = 'help';
}

Command.run(command, Optimist.argv._.slice(1), Optimist.argv);

