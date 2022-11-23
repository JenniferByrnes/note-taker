const path = require("path");
const router = require("express").Router();

router.get("/notes", (req, res) => {
  // res.sendFile(path.join(__dirname, "../../public/notes.html"));
  res.sendFile('notes.html', { root: path.join(__dirname, '../../public')})
});

router.get("*", (req, res) => {
  // res.sendFile(path.join(__dirname, '../../public/index.html'));
  res.sendFile('index.html', { root: path.join(__dirname, '../../public')})
});

module.exports = router;