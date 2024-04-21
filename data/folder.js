// Folder.js
import Note from "./note.js";

class Folder {
  constructor(name, notes = []) {
    this.name = name;
    this.notes = notes.map((noteDetails) => new Note(noteDetails));
  }

  addNote(noteDetails) {
    const newNote = new Note(noteDetails);
    this.notes.push(newNote);
  }
}

export default Folder;
