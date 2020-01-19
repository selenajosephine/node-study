#!/usr/bin/env node
const argv = require('yargs')
    // register command - add to CLI 
    // command name, command description, handler function
    .command('add', 'add a new note', function () {
        console.log('adding a new note');
    })
    // register command - remove to CLI 
    .command('remove', 'delete a note', function () {
        console.log('removing the note');
    })
    // register command - list to CLI 
    .command('list', 'list the notes', function () {
        console.log('listing the notes');
    })
    // register command - read to CLI 
    .command('read', 'read a note', function () {
        console.log('reading a note');
    })
    .help('h')
    .alias('h', 'help')
    .argv