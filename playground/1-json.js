const fs = require('fs')
const filename = './1-json.json';
/**
 * Read existing JSON and overwrite it
 */
const databuffer = fs.readFileSync(filename).toString();
const data = JSON.parse(databuffer);
data['age'] = 24;
data['name'] = 'Selena';
const stringdata = JSON.stringify(data);
fs.writeFile(filename, stringdata, (err) => {
    if (err) console.log(err);
    console.log('data overwritten');
});

/**
 * Code to create a new JSON with book name
 */
const book = {
    "title": "How to kill a mockingbird",
    "author": "Authors name I forgot"
}

const bookJson = JSON.stringify(book);
fs.writeFile('1-json.json', bookJson,(err)=>{
    if(err) console.log(err);
    console.log('success')
})