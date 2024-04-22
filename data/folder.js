// Folder.js
import Note from "./note-class.js";

class Folder {
  constructor(name, id, notes = []) {
    this.name = name;
    this.id = id;
    this.notes = notes.map((noteDetails) => new Note(noteDetails));
  }

  addNote(noteDetails) {
    const newNote = new Note(noteDetails);
    this.notes.push(newNote);
  }
}

export const foldersData = [
  {
    name: "Folder 1",
    id: "folderId1",
    notes: [
      {
        id: "id1",
        name: "My first note in Folder 1",
        content: "Content of first note in Folder 1",
        lastEdited: "April 15, 2024",
      },
    ],
  },
  {
    name: "Folder 2",
    id: "folderId2",
    notes: [
      {
        id: "id2",
        name: "My first note in Folder 2",
        content: "Content of first note in Folder 2",
        lastEdited: "April 11, 2024",
      },
    ],
  },
];

export const folders = foldersData.map((folderData) => {
  const { name, id, notes } = folderData;
  return new Folder(name, id, notes);
});

export default Folder;
