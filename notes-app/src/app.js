const chalk = require('chalk');
var yargs = require('yargs').argv;
var notes = require('./notes');
var command = process.argv[2].toUpperCase();
console.log(process.argv);
console.log('yargs', yargs);
console.log(yargs.title);

switch (command) {
    case "ADD":
        console.log("inside add");
        break;
    case "REMOVE":
        console.log("inside remove");
        break;
    default:
        console.log("Try again");
        break;
}