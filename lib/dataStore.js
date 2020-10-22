const fs = require("fs").promises;
const path = require("path")
const uudv1 = require("uuid/v1");

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
}

module.exports = new dataStore();