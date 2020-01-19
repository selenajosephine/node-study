#!/usr/bin/env node
const notes = require('./notes')

const argv = require('yargs')
    // register command - add to CLI 
    // command name, command description, builder properties, handler function
    .command('add', 'Add a new note', {
        // property name
        title: {
            // title description
            describe: 'note title',
            // required true
            demandOption: true,
            // data type string
            type: 'string'
        },
        body: {
            describe: 'note content',
            demandOption: true,
            type: 'string'
        }
    }, (argv) => {
        notes.addNotes(argv.title, argv.body);
    })
    // register command - remove to CLI 
    .command('remove', 'Delete a note', {
        title: {
            describe: 'note to be deleted',
            demandOption: true,
            type: 'string'
        }
    }, (argv) => {
        notes.removeNotes(argv.title);
    })
    // register command - list to CLI 
    .command('list', 'List the notes', () => {
        notes.getNotes();
    })
    // register command - read to CLI 
    .command('read', 'Read a note', {
        title: {
            describe: 'read note',
            demandOption: true,
            type: 'string'
        }
    }, (argv) => {
        notes.readNote(argv.title);
    })
    .help('h')
    .alias('h', 'help')
    .argv

