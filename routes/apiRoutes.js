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
        const newNote = req.body;
        dataStore.putNote(newNote)
            .then((note) => res.json(note))
            .catch((err) => res.status(500).json(err));
    });

    app.delete("/api/notes/:id", (req, res) => {
        const noteID = req.params.id;
        dataStore.deleteNote(noteID)
            .then(() => res.json({ sucess: true }))
            .catch((err) => res.status(500).json(err));
    })


}

