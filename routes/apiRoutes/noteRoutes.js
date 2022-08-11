const router = require('express').Router();
const crypto = require('crypto');
const fs = require("fs");
const path = require('path');


// get all notes from the file
router.get('/notes', (req, res) => {

  var variable = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../api/notes.json')
  ));

  return res.json(variable.notes);
});

router.delete("/notes/:id", async function (req, res) {

  /* Get a fresh READ */
  var variable = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../api/notes.json')
  ));
    // Filters out the deleted note from notesArray
    const newNotesArray = variable.notes.filter(note => note.id != req.params.id);
    // Save the filtered array
    fs.writeFileSync(
      path.join(__dirname, '../../api/notes.json'),
      JSON.stringify({ notes: newNotesArray }, null, 2)
    );
// Returns array without deleted item
res.json(newNotesArray)
});

// Add a new note ROUTE
router.post('/notes', (req, res) => {
  // create a random index ID
  req.body.id = crypto.randomUUID();

  // Get a fresh READ from the table
  var variable = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../api/notes.json')
  ));
  
  // Push the new note into the array and save it
  const note = req.body;
  variable.notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../../api/notes.json'),
    JSON.stringify({ notes: variable.notes }, null, 2)
  );
  res.json(note);
});

module.exports = router;