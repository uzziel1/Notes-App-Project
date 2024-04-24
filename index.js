// import { notes } from "./data/note.js";
import Folder from "./data/folder.js";
import { folders, foldersData } from "./data/folder.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//Updating Clock Element
const dateElement = document.querySelector(".js-date-info");
const clockElement = document.querySelector(".js-time-info");

function updateClock() {
  const currentDate = dayjs().format("MMMM D, YYYY");
  const currentTime = dayjs().format("hh:mm:ss A");

  dateElement.innerText = currentDate;
  clockElement.innerText = currentTime;
}

updateClock();
const clockIntervalId = setInterval(updateClock, 1000);

//START OF BUTTON FUNCTIONALITY
let btn = document.querySelector("#btn");
let header = document.querySelector(".header");
let sidebar = document.querySelector(".sidebar");

btn.onclick = function () {
  sidebar.classList.toggle("active");

  header.classList.toggle("active");
};

//END OF BUTTON FUNCTIONALLITY ^^^^

//Renders Folders HTML
const hiddenFolders = [];

function renderFolderHTML() {
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
          <i class="bx bx-plus js-folder-add-note" data-folder-id="${folder.id}"></i>
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

    document.querySelector(".notes").innerHTML = foldersHTML;
  });

  function findMatchingFolderIndex(folderId) {
    let matchingFolderIndex;

    folders.forEach((folder, index) => {
      if (folder.id === folderId) {
        matchingFolderIndex = index;
      }
    });

    return matchingFolderIndex;
  }

  //Folder Buttons
  const folderDropDownButton = document.querySelectorAll(
    ".js-folder-dropdown-button"
  );
  const folderUpButton = document.querySelectorAll(".js-folder-up-button");

  folderDropDownButton.forEach((button) => {
    button.addEventListener("click", () => {
      const folderId = button.dataset.folderId;
      const container = document.querySelector(`.js-notes-grid-${folderId}`);
      container.classList.add("is-hiding-notes");

      if (!hiddenFolders.includes(folderId)) {
        hiddenFolders.push(folderId);
      }

      console.log(hiddenFolders);
    });
  });

  folderUpButton.forEach((button) => {
    button.addEventListener("click", () => {
      const folderId = button.dataset.folderId;
      const container = document.querySelector(`.js-notes-grid-${folderId}`);
      container.classList.remove("is-hiding-notes");

      if (hiddenFolders.includes(folderId)) {
        const index = hiddenFolders.indexOf(folderId);
        console.log(index);
        hiddenFolders.splice(index, 1);
      }

      console.log(hiddenFolders);
    });
  });

  const modal = document.querySelector(".create-new-note");
  const openModal = document.querySelectorAll(".js-folder-add-note");
  // const closeModal = document.querySelectorAll(".close-add-note-button");

  openModal.forEach((button) => {
    button.addEventListener("click", () => {
      const folderId = button.dataset.folderId;
      const folderIndex = findMatchingFolderIndex(folderId);
      const form = document.querySelector(".form");

      // Clear the noteTitle input field
      document.querySelector(".js-note-title").value = "";

      modal.showModal();

      const handleFormSubmit = () => {
        let noteTitle = document.querySelector(".js-note-title").value;
        folders[folderIndex].addNote({
          id: "id2",
          name: noteTitle,
          content: "",
          lastEdited: "April 22, 2024",
        });
        renderFolderHTML();
        console.log(hiddenFolders);
        noteTitle = "";

        form.removeEventListener("submit", handleFormSubmit);
      };

      form.addEventListener("submit", handleFormSubmit);
    });
  });

  /*
  closeModal.addEventListener("click", () => {
    modal.close();
  });
  */

  hiddenFolders.forEach((hiddenFolderId) => {
    const container = document.querySelector(
      `.js-notes-grid-${hiddenFolderId}`
    );
    container.classList.add("is-hiding-notes");
  });
}

renderFolderHTML();
