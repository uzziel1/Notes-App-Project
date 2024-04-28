// Folder.js
import Note from "./note-class.js";

/* 
class Folder {
  constructor(name, id, notes = []) {
    this.name = name;
    this.id = id;
    this.notes = notes.map((noteDetails) => new Note(noteDetails));
  }

  addNote(noteDetails) {
    const newNote = new Note(noteDetails);
    this.notes.push(newNote);
    //note
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

export let foldersData = [
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

*/

class Folder {
  folderData = [
    {
      name: "folder1",
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
      name: "folder2",
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
  addNoteToFolder(noteDetails, folderId) {
    const newNote = new Note(noteDetails);
    let matchingFolderIndex = -1;
    this.folderData.forEach((folder, index) => {
      if (folder.id === folderId) {
        matchingFolderIndex = index;
        console.log(matchingFolderIndex);
      }
    });
    if (matchingFolderIndex !== -1) {
      // Ensure the 'notes' property exists before pushing the new note
      if (!this.folderData[matchingFolderIndex].notes) {
        this.folderData[matchingFolderIndex].notes = [];
      }
      this.folderData[matchingFolderIndex].notes.push(newNote);
    }
  }

  deleteNoteFromFolder(folderId, noteId) {
    let matchingFolder = null;
    let matchingNoteIndex = -1;

    // Find the matching folder
    this.folderData.forEach((folder) => {
      if (folder.id === folderId) {
        matchingFolder = folder;
      }
    });

    // If the folder is found, find the matching note within the folder
    if (matchingFolder) {
      matchingFolder.notes.forEach((note, index) => {
        if (note.id === noteId) {
          matchingNoteIndex = index;
        }
      });
    }

    // If the note is found, delete it from the folder's notes array
    if (matchingNoteIndex !== -1) {
      matchingFolder.notes.splice(matchingNoteIndex, 1);
    } else {
      console.error("Note not found in folder:", noteId);
    }
  }

  addNewFolder(folderName) {
    this.folderData.push({
      name: folderName,
      id: Math.random(),
      notes: [],
    });
    console.log(this);
  }
}
export const folders = new Folder();
