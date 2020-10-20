const fs = require("fs");
const path = require("path");
// const json = require("json")

const notesDBFile = path.join(__dirname, "../db/db.json");


module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        let notesJSON = {};
        fs.readFile(notesDBFile, "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            notesJSON = JSON.parse(data);
            console.log(notesJSON);
            res.json(notesJSON);
        });
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
    })


}

