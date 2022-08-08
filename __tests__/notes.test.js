const fs = require("fs");

const {
  createNewNote
} = require("../lib/notes.js");

const { notes } = require('../api/notes');
const { expect } = require("expect");

jest.mock('fs');

test("creates an note object", () => {
  const note = createNewNote(
    { title: "Test Note", text: "jhgdja3ng2" },
    notes
  );

  expect(note.title).toBe("Test Note");
  expect(note.text).toBe("jhgdja3ng2");
});
