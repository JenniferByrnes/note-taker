const router = require('express').Router();
const crypto = require('crypto');

const { createNewNote, deleteNote, renderNotes, validateNote } = require('../../lib/notes');
const { notes } = require('../../api/notes');

// get all notes from the file
router.get('/notes', (req, res) => {
  let { notes } = renderNotes();
  return res.json(notes);
});

router.delete("/notes/:id", function (req, res) {

  return deleteNote(req.params.id, notes);
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = crypto.randomUUID();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;