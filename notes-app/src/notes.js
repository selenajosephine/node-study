const fs = require('fs');
const file = '../data/notes.json'

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
    fs.writeFile(file, dataJSON, (err)=>{
        if(err) console.log(err);
        console.log('New Note added!')
    })
}

const getNotes = () => {
    return "Your notes..";
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    notes.push({
        title, body
    })
    saveNotes(notes);
}

module.exports = { getNotes: getNotes, addNotes: addNotes }