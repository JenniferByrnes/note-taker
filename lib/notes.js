const fs = require("fs");
const path = require('path');

/*function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}
*/
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../api/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function renderNotes() {

  var variable = fs.readFileSync(
    path.join(__dirname, '../api/notes.json')
  );
  return JSON.parse(variable);
}

function deleteNote(id, notesArray) {

  // Filters out the deleted note from notesArray
  const newNotesArray = notesArray.filter(note => note.id != id);

  fs.writeFileSync(
    path.join(__dirname, '../api/notes.json'),
    JSON.stringify({ notes: newNotesArray }, null, 2)
  );

  //window.location = "/notes";
  //window.location.reload();
  return newNotesArray;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

module.exports = {
  createNewNote,
  deleteNote,
  renderNotes,
  validateNote
}