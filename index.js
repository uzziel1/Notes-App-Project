// import { notes } from "./data/note.js";
import Folder from "./data/folder.js";

//START OF BUTTON FUNCTIONALITY
let btn = document.querySelector("#btn");
let header = document.querySelector(".header");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function () {
  sidebar.classList.toggle("active");

  header.classList.toggle("active");
};

//END OF BUTTON FUNCTIONALLITY ^^^^

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
  const { name, id, notes } = folderData;
  return new Folder(name, id, notes);
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
  id: "id1",
  name: "Another note in Fr 2",
  content: "Content of ar note in Folder 2",
  lastEdited: "April 16, 2024",
});

//Renders Folders HTML
let foldersHTML = "";

folders.forEach((folder) => {
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
      <i class="bx bx-plus js-folder-add-note"></i>
      <i
        class="bx bx-chevron-up folder-dropdown-button js-folder-dropdown-button"
        data-folder-id="${folder.id}"
      ></i>
      <i
        class="bx bx-chevron-down js-folder-up-button"
        data-folder-id="${folder.id}"
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

//Folder Buttons
const folderDropDownButton = document.querySelectorAll(
  ".js-folder-dropdown-button"
);
const folderUpButton = document.querySelectorAll(".js-folder-up-button");
const plusButton = document.querySelectorAll(".js-folder-add-note");

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

plusButton.forEach((button) => {});

const modal = document.querySelector(".create-new-note");
const openModal = document.querySelectorAll(".js-folder-add-note");
const closeModal = document.querySelectorAll(".close-add-note-button");

openModal.forEach((button) => {
  button.addEventListener("click", () => {
    modal.showModal();
  });
});

closeModal.addEventListener("click", () => {
  modal.close();
});
