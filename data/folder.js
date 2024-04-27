// Folder.js
import Note from "./note-class.js";
import { renderFolderHTML } from "../index.js";

class Folder {
  constructor(name, id, notes = []) {
    this.name = name;
    this.id = id;
    this.notes = notes.map((noteDetails) => new Note(noteDetails));
  }

  addNote(noteDetails) {
    const newNote = new Note(noteDetails);
    this.notes.push(newNote);
    renderFolderHTML();
  }
}

export function deleteNote(folderId, noteId) {
  const matchingFolder = folders.find((folder) => folder.id === folderId);

  if (!matchingFolder) {
    console.error("Folder not found");
    return;
  }

  matchingFolder.notes = matchingFolder.notes.filter(
    (note) => note.id !== noteId
  );
}

let foldersData = [
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
      {
        id: "id2",
        name: "second test note",
        content: "Content of first note in Folder 1",
        lastEdited: "April 27, 2024",
      },
    ],
  },
  {
    name: "Folder 2",
    id: "folderId2",
    notes: [
      {
        id: "id3",
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
