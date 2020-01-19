const fs = require('fs');
const file = '../data/notes.json'
const chalk = require('chalk');
const loadNotes = () => {
    try {
        const notes = fs.readFileSync(file);
        const notesString = notes.toString();
        return JSON.parse(notesString);
    }
    catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFile(file, dataJSON, (err) => {
        if (err) console.log(err);
    })
}

const getNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => console.log(note.title))
    return notes;;
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.find(note => note.title === title)
    if (!duplicateNotes) {
        notes.push({
            title, body
        })
        saveNotes(notes);
    }
    else {
        console.log('Note title taken')
    }
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title)
    if (filteredNotes.length === notes.length) {
        console.log(chalk.red("Element not found"));
        return;
    }
    if (filteredNotes)
        saveNotes(filteredNotes);
    console.log(chalk.green("Note removed"))
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title)
    console.log(JSON.stringify(foundNote));
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    readNote: readNote
}