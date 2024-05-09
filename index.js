// import { notes } from "./data/note.js";
import { folders } from "./data/folder.js";
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
const addedMessageTimeouts = {};
export function renderFolderHTML() {
  let foldersHTML = "";

  folders.folderData.forEach((folder) => {
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
        <div class="folder-logo js-folder-info-button" data-folder-id = "${folder.id}">
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

  let leftSidebarOpen = false;
  let folderOpened = "";

  document.querySelectorAll(".js-folder-info-button").forEach((button) => {
    button.addEventListener("click", () => {
      const folderId = button.dataset.folderId;
      if (!leftSidebarOpen) {
        leftFolderSidebar.classList.toggle("active");
        folderOpened = folderId;
        leftSidebarOpen = true;
        renderFolderInfoHTML(folderId);
      } else if (leftSidebarOpen && folderOpened === folderId) {
        leftFolderSidebar.classList.toggle("active");
        leftSidebarOpen = false;
        folderOpened = "";
      } else if (leftSidebarOpen && folderOpened !== folderId) {
        renderFolderInfoHTML(folderId);
        folderOpened = folderId;
      }
    });
  });

  let leftFolderSidebar = document.querySelector(".js-left-folder-info");

  let folderInfoCloseButton = document.querySelector(
    ".js-close-sidebar-button"
  );

  folderInfoCloseButton.onclick = function () {
    leftFolderSidebar.classList.toggle("active");
    leftSidebarOpen = false;
  };
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
        console.log("succesful");
      }
    });
  });

  hiddenFolders.forEach((hiddenFolderId) => {
    const container = document.querySelector(
      `.js-notes-grid-${hiddenFolderId}`
    );
    container.classList.add("is-hiding-notes");
  });

  //Folder info button
  renderFolderInfoHTML();
  attachDeleteButtonListeners();
  attachCreateNewNoteButtonListeners();
}

function renderFolderInfoHTML(folderId = folders.folderData[0].id) {
  let foldersInfoHTML = ``;
  let folderNotesHTML = ``;
  let matchingFolder;
  folders.folderData.forEach((folder) => {
    if (folder.id === folderId) {
      matchingFolder = folder;
    }
  });

  matchingFolder.notes.forEach((notes) => {
    folderNotesHTML += `
    <div class="note-container">
    <div class="note-title"><i class="bx bx-note"></i>${notes.name}</div>
    <i class="bx bxs-x-circle delete-button js-delete-button" data-note-id = "${notes.id}" data-folder-id = "${matchingFolder.id}"></i>
    <div class="note-img-mock">
      ${notes.content}
    </div>
  
    <div class="last-edit">Last edited ${notes.lastEdited}</div>
  </div>
    `;
  });

  foldersInfoHTML = `<div class="folder-info-data">
  <div class="folder-info-name">
    <i class="bx bx-folder"></i>
    ${matchingFolder.name}
  </div>
  <div class="date-created">
    <i class="bx bx-calendar"></i>
    Date Created: May 7th 2024
  </div>
  <div class="unnamed-div1">
    <i class="bx bx-notepad"></i>
    Note Count: ${matchingFolder.notes.length}
  </div>
  <div class="unnamed-div2">
    <i class="bx bx-purchase-tag-alt"></i>
    Tags
  </div>
  <input
    type="text"
    class="folder-description"
    placeholder="Add folder description here..."
  />
  <!-- end of folderInfoData -->
</div>

<div class="line-seperator"></div>
<div class="folder-info-notes-container">
  <p>Notes:</p>
  <div class="folder-info-notes-grid">
    ${folderNotesHTML}
  </div>
</div>`;

  document.querySelector(".js-data-container").innerHTML = foldersInfoHTML;
}
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

  folders.deleteNoteFromFolder(folderId, noteId);
  renderFolderHTML();
}

// Attach event listeners when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  attachDeleteButtonListeners();
});
function attachCreateNewNoteButtonListeners() {
  const openModals = document.querySelectorAll(".js-folder-add-note");
  openModals.forEach((button) => {
    button.addEventListener("click", handleNewNoteButtonClick);
  });
}

function handleNewNoteButtonClick(event) {
  const button = event.target;
  const folderId = button.dataset.folderId;
  const form = document.querySelector(".form");
  const modal = document.querySelector(".create-new-note");

  // Clear the noteTitle input field
  document.querySelector(".js-note-title").value = "";

  modal.showModal();

  const handleFormSubmit = () => {
    let noteTitle = document.querySelector(".js-note-title").value;
    folders.addNoteToFolder(
      {
        id: `id${Date.now()}`,
        name: noteTitle,
        content: "",
        lastEdited: `${dayjs().format("MMMM D, YYYY")}`,
      },
      folderId
    );

    renderFolderHTML();
    updateAddedNote(folderId);
    noteTitle = "";
    form.removeEventListener("submit", handleFormSubmit);
  };

  form.addEventListener("submit", handleFormSubmit);
}

document.addEventListener("DOMContentLoaded", function () {
  attachCreateNewNoteButtonListeners();
});

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

//Create New folder Sidebar Button
document.querySelector(".js-create-folder").addEventListener("click", () => {
  const form = document.querySelector(".js-folder-title-form");
  const modal = document.querySelector(".js-create-new-folder");

  // Clear the noteTitle input field
  document.querySelector(".js-new-folder-title").value = "";

  modal.showModal();

  const handleFormSubmit = () => {
    let folderTitle = document.querySelector(".js-new-folder-title").value;
    folders.addNewFolder(folderTitle);

    renderFolderHTML();

    folderTitle = "";
    form.removeEventListener("submit", handleFormSubmit);
  };

  form.addEventListener("submit", handleFormSubmit);
});

renderFolderHTML();
