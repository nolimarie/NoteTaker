const router = require("express").Router();
const store = require("../db/store");

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
//  /api/notes
router.get("/notes", (req, res) => {
    store.getNotes().then((notes) => {
        return res.json(notes);
    })
    .catch (err => {
        res.status(400).json(err)
    })

// /api/notes
router.post("/notes", (req, res) => {
    store.addNote(req.body).then((note) => res.json(note)); //data will be stored that comes in from the front end on req.body
    })
    .catch (err => {
        res.status(400).json(err)
    })
});

//create routes that get notes, post notes, delete(bonus)

router.delete('/notes/:id', (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(400).json(err))
})

module.exports = router;
