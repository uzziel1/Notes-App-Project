// import { notes } from "./data/note.js";
import { folders, deleteNote } from "./data/folder.js";
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

function addClassList() {}
//Renders Folders HTML
const hiddenFolders = [];

const addedMessageTimeouts = {};

function updateAddedNote(folderId) {
  document
    .querySelector(`.js-note-added-${folderId}`)
    .classList.add("note-is-visible");

  const previousTimeoutId = addedMessageTimeouts[folderId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    document
      .querySelector(`.js-note-added-${folderId}`)
      .classList.remove("note-is-visible");
  }, 1500);

  addedMessageTimeouts[folderId] = timeoutId;
}

export function renderFolderHTML() {
  let foldersHTML = "";

  folders.forEach((folder) => {
    let notesHTML = "";

    folder.notes.forEach((notes) => {
      notesHTML += `
      <div class="note-container">
      <div class="note-title"><i class="bx bx-note"></i>${notes.name}</div>
      <i class="bx bxs-x-circle delete-button js-delete-button" data-note-id = "${notes.id}" data-folder-id = "${folder.id}"></i>
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
        <div class="note-added js-note-added-${folder.id}" data-folder-id="${folder.id}">
        <i class="bx bxs-check-circle"></i>
        <p>Added note</p>
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
    });
  });

  folderUpButton.forEach((button) => {
    button.addEventListener("click", () => {
      const folderId = button.dataset.folderId;
      const container = document.querySelector(`.js-notes-grid-${folderId}`);
      container.classList.remove("is-hiding-notes");

      if (hiddenFolders.includes(folderId)) {
        const index = hiddenFolders.indexOf(folderId);

        hiddenFolders.splice(index, 1);
      }
    });
  });

  //Delete button
  function attachDeleteButtonListeners() {
    const deleteButtons = document.querySelectorAll(".js-delete-button");
    deleteButtons.forEach((button) => {
      button.removeEventListener("click", handleDeleteButtonClick);
      button.addEventListener("click", handleDeleteButtonClick);
    });
  }

  function handleDeleteButtonClick(event) {
    const button = event.target;
    const folderId = button.dataset.folderId;
    const noteId = button.dataset.noteId;

    folders.forEach((folder) => {
      if (folder.id === folderId) {
        folder.notes.forEach((note, index) => {
          if (note.id === noteId) {
            console.log(`noteId: ${noteId}, noteIndex: ${index}`);
          }
        });
      }
    });
  }

  // Attach event listeners when the DOM is ready
  document.addEventListener("DOMContentLoaded", function () {
    attachDeleteButtonListeners();
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
          id: Math.random(),
          name: noteTitle,
          content: "",
          lastEdited: "April 22, 2024",
        });

        updateAddedNote(folderId);
        console.log(folders);
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

/*
// Check if the ID is already stored in local storage
let id = localStorage.getItem("generatedId");

// If the ID is not stored, generate it and save it in local storage
if (!id) {
  id = `id${Date.now()}`; // Generate the current time in milliseconds
  localStorage.setItem("generatedId", id); // Save the ID in local storage
}

// Use the ID variable as needed
console.log("Generated ID:", id);
console.log(id);
console.log(`id${Date.now()}`);

folders[0].notes.forEach((note, index) => {
  if (note.id === "id1") {
    console.log("found Id1");
    console.log(index);
  } else if (note.id === "id2") {
    console.log("foundId2");
    console.log(index);
  } else if (note.id !== "id3") {
  }
});

*/
