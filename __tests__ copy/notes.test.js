const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../lib/notes.js");
const { notes } = require("../data/notes");

jest.mock('fs');

test("creates an note object", () => {
  const note = createNewNote(
    { title: "Test Note", text: "jhgdja3ng2" },
    notes
  );

  expect(note.title).toBe("Test Note");
  expect(note.text).toBe("jhgdja3ng2");
});

test("filters by query", () => {
  const startingNotes = [
    {
      id: "3",
      title: "Text Note #1",
      text: "tremendously interesting note text"
    },
    {
      id: "4",
      title: "Text Note #2",
      text: "yet more tremendously interesting note text"
    }
  ];
  const updateNotes = filterByQuery({ text: "tremendously interesting note text" }, startingNotes);

  expect(updateNotes.length).toEqual(1);
});

test("finds by id", () => {
  const startingNotes = [
    {
      id: "3",
      title: "Text Note #1",
      text: "tremendously interesting note text"
    },
    {
      id: "4",
      title: "Text Note #2",
      text: "yet more tremendously interesting note text"
    }
  ];

  const result = findById("3", startingNotes);

  expect(result.name).toBe("Text Note #1");
});