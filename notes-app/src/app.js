var chalk = require('chalk');
var notes = require('./notes');
console.log(notes.getNotes());

console.log(chalk.red("Success"));
console.log(chalk.green("Success in green"));
console.log(chalk.blue.bgRed.bold('Hello world!'))

/** 
 * Reference code for importing new modules
 */
// var utils = require('./test1.js');
// var sum = utils.add(2, 3);
// console.log(sum);