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

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
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