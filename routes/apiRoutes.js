const fs = require("fs");
const path = require("path");
const uuidv1 = require("uuid/v1")

const dataStore = require("../lib/dataStore");

const dbFile = path.join(__dirname, "../db/db.json");

const readDBFile = (dbFile) => {
    try {
        const data = fs.readFileSync(dbFile, "utf8");
        return JSON.parse(data);
    } catch (e) {
        throw e;
    }
}

const updateDBFile = (dbFile, data) => {
    try {
        const result = fs.writeFileSync(dbFile, data);
        return result;
    } catch (e) {
        throw e;
    }

}

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        dataStore.getNotes()
            .then((notes) => res.json(notes))
            .catch((err) => res.status(500).json(err))
    });

    app.post("/api/notes", (req, res) => {
        const { title, text } = req.body;
        const newNote = { title, text, id: uuidv1() };
        const notesJSON = readDBFile(dbFile);
        notesJSON.push(newNote);
        updateDBFile(dbFile, JSON.stringify(notesJSON));
        res.json(newNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const delNoteId = req.params.id;
        console.log(delNoteId);
        const notesJSON = readDBFile(dbFile);
        console.log(notesJSON);
        notesJSON.filter((note) => note.id !== delNoteId);
        console.log(notesJSON);
        updateDBFile(dbFile, JSON.stringify(notesJSON));
        res.json(notesJSON);
    })


}

