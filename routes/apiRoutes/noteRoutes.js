const router = require('express').Router();
const crypto = require('crypto');
const fs = require("fs");
const path = require('path');
//const { notes } = require('../../api/notes');

// get all notes from the file
router.get('/notes', (req, res) => {

  var variable = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../api/notes.json')
  ));

  return res.json(variable.notes);
});

router.delete("/notes/:id", async function (req, res) {

  var variable = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../api/notes.json')
  ));
  const newData= await deleteSingleNote();
  async function deleteSingleNote() {
    // Filters out the deleted note from notesArray
    const newNotesArray = variable.notes.filter(note => note.id != req.params.id);
    fs.writeFileSync(
      path.join(__dirname, '../../api/notes.json'),
      JSON.stringify({ notes: newNotesArray }, null, 2)
    );
    return newNotesArray;
  }
// Returns array without deleted item
res.json(newData)
});

router.post('/notes', (req, res) => {
  // create a random index ID
  req.body.id = crypto.randomUUID();

  var variable = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../../api/notes.json')
  ));
  const note = createNewNote(req.body, variable.notes);
  res.json(note);
  
  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../../api/notes.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }
});
/*  Sample code of delete
app.delete('/expressions/:id',(req,res,next)=>{
  const eleIndex = getIndexById(req.params.id,expressions);
if(eleIndex!==-1){
    expressions.splice(eleIndex,1);
    res.status(204).send(expressions[eleIndex]);
}
else{
    res.status(404).send();
}
});



Assuming your array is just a standard array, the easiest way to remove an item from an array is to use .filter() to return a new copy of the array without the item you want to delete.

app.delete("/api/notes/:id", function(req, res) {
    console.log("req params", req.params.id)
    myArray = myArray.filter(({ id }) => id !== req.params.id);
  });
Otherwise, if you need to mutate (modify) the existing array, you can use .findIndex() and .splice() instead.

app.delete("/api/notes/:id", function(req, res) {
    console.log("req params", req.params.id)
    const itemIndex = myArray.findIndex(({ id }) => id === req.params.id);
    if (itemIndex >= 0) {
      myArray.splice(itemIndex, 1);
    }
  });
*/
module.exports = router;