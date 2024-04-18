import { notes } from "./data/notes.js";

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
