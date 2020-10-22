const fs = require("fs").promises;
const path = require("path");
const uuidv1 = require("uuid/v1");

const dbFile = path.join(__dirname, "../db/db.json");


class dataStore {
    read() {
        return fs.readFile(dbFile, "utf8");
    }
    write(note) {
        return fs.writeFile(dbFile, JSON.stringify(note));
    }
    getNotes() {
        return this.read()
            .then((notes) => {
                let jsonNotes;

                try {
                    jsonNotes = [].concat(JSON.parse(notes));
                } catch (e) {
                    jsonNotes = [];
                }
                return jsonNotes;

            });
    }
    putNote(note) {
        const { title = "EMPTY", text = "EMPTY" } = note;

        const newNote = { title, text, id: uuidv1() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((newNotes) => this.write(newNotes))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((newNotes) => this.write(newNotes));
    }

}

module.exports = new dataStore();