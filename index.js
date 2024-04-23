// import { notes } from "./data/note.js";
import Folder from "./data/folder.js";
import { folders, foldersData } from "./data/folder.js";

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
  });

  document.querySelector(".notes").innerHTML = foldersHTML;

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

  const modal = document.querySelector(".create-new-note");
  const openModal = document.querySelectorAll(".js-folder-add-note");
  // const closeModal = document.querySelectorAll(".close-add-note-button");

  openModal.forEach((button) => {
    button.addEventListener("click", () => {
      const folderId = button.dataset.folderId;
      const folderIndex = findMatchingFolderIndex(folderId);
      const form = document.querySelector(".form");

      modal.showModal();

      // Define a function to handle form submission
      const handleFormSubmit = () => {
        let noteTitle = document.querySelector(".js-note-title").value;
        folders[folderIndex].addNote({
          id: "id2",
          name: noteTitle,
          content: "",
          lastEdited: "April 22, 2024",
        });
        renderFolderHTML();
        noteTitle = "";

        // Remove the event listener after form submission
        form.removeEventListener("submit", handleFormSubmit);
      };

      form.addEventListener("submit", handleFormSubmit);

      console.log(folders[folderIndex]);
    });
  });

  /*
  closeModal.addEventListener("click", () => {
    modal.close();
  });
  */
}

renderFolderHTML();
