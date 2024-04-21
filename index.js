// import { notes } from "./data/note.js";
import Folder from "./data/folder.js";

//START OF BUTTON FUNCTIONALITY
let btn = document.querySelector("#btn");
let header = document.querySelector(".header");
let sidebar = document.querySelector(".sidebar");

let folderDropDownButton = document.querySelectorAll(
  ".js-folder-dropdown-button"
);

let folderUpButton = document.querySelectorAll(".js-folder-up-button");

btn.onclick = function () {
  sidebar.classList.toggle("active");

  header.classList.toggle("active");
};

//Maybe Add an Id for each notes ???

//Check the update button js

folderDropDownButton.forEach((button) => {
  button.addEventListener("click", () => {
    const folderId = button.dataset.folderId;

    const container = document.querySelector(`.js-notes-grid-${folderId}`);

    container.classList.add("is-hiding-notes");
  });
});

folderUpButton.forEach((button) => {
  button.addEventListener("click", () => {
    const folderId = button.dataset.folderId;

    const container = document.querySelector(`.js-notes-grid-${folderId}`);

    container.classList.remove("is-hiding-notes");
  });
});

//END OF BUTTON FUNCTIONALLITY ^^^^
/*
let notesHTML = "";


notes.forEach((notes) => {
  notesHTML += `
  <div class="note-container">
  <div class="note-title"><i class="bx bx-note"></i>${notes.name}</div>

  <div class="note-img-mock">
    ${notes.content}
  </div>

  <div class="last-edit">Last edited ${notes.lastEdited}</div>
</div>
  `;
});

document.querySelector(".notes-list-grid").innerHTML = notesHTML;
*/

const foldersData = [
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

const folders = foldersData.map((folderData) => {
  const { name, notes } = folderData;
  return new Folder(name, notes);
});

// Add a new note to Folder 1
folders[0].addNote({
  id: "id3",
  name: "Another note in Folder 1",
  content: "Content of another note in Folder 1",
  lastEdited: "April 16, 2024",
});

// Add a new note to Folder 2
folders[1].addNote({
  id: "id4",
  name: "Another note in Folder 2",
  content: "Content of another note in Folder 2",
  lastEdited: "April 16, 2024",
});

let foldersHTML = "";

foldersData.forEach((folder) => {
  let notesHTML = "";

  folder.notes.forEach((notes) => {
    notesHTML += `
  <div class="note-container">
  <div class="note-title"><i class="bx bx-note"></i>${notes.name}</div>

  <div class="note-img-mock">
    ${notes.content}
  </div>

  <div class="last-edit">Last edited ${notes.lastEdited}</div>
</div>
  `;
  });

  foldersHTML += `
  <div class="folder">
  <div class="folder-name">
    <div class="folder-logo">
      <i class="bx bx-folder"></i>
      <p>${folder.name}</p>
    </div>
    <div class="add-down-icons">
      <i class="bx bx-plus"></i>
      <i
        class="bx bx-chevron-up folder-dropdown-button js-folder-dropdown-button"
        data-folder-Id="${folder.id}"
      ></i>
      <i
        class="bx bx-chevron-down js-folder-up-button"
        data-folder-Id="${folder.id}"
      ></i>
    </div>
  </div>
  <div class="notes-list-grid js-notes-grid-${folder.id}">
    ${notesHTML}
    </div>
  </div>
  `;
});

document.querySelector(".notes").innerHTML = foldersHTML;

console.log(folders);

console.log(foldersHTML);
