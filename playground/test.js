const fs = require('fs');

// fs.writeFileSync('notes.txt','This file was created by nodejs written by Selena');
// two ways to append data to a file
// 1. Read the file, append data and write the file (overwrite)
var textFromFile = fs.readFileSync('notes.txt');
var textToFile = textFromFile + "and this is text appended by code";
fs.writeFileSync('notes.txt', textToFile);

// 2. append text to file
fs.appendFileSync('notes.txt', "and this is text appended by code");
