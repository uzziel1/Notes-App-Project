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

export default Folder;
