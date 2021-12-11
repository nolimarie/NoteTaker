//create a class called store with methods that read json file,  get, add,

//native node module, that allows us access to the file system, readFile, writeFile
const fs = require("fs");
const { getEnabledCategories } = require('trace_events');
const util = require("util");


//we now can use promise objects instead of callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//es6 syntax -classes are blueprints for creating objects
class Store {
    //read method
    read() {
        return readFileAsync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((notes) => {
            //return the parsedNotes
            const parsedNotes = JSON.parse(notes);
            parsedNotes.push(newNote);
        });
    }

    addNote(note) {
        //this will be code to add a note to db.json
        const {title, text} = note

        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = {title, text}

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }
}
 
//export a newly created object with the methods on the prototype
module.exports = new Store(); //exporting a newly create object from calling the Store class
