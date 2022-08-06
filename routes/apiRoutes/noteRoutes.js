const router = require('express').Router();
const crypto = require('crypto');

const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/notes');

router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
/*  Dont need to query to server for single note
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});
*/
router.delete('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  //req.body.id = notes.length.toString();
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