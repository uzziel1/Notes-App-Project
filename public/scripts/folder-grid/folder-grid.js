import { folders } from '../../data/folder.js';
import { attachDeleteButtonListeners } from './delete-note.js';
import {
  attachCreateNewNoteButtonListeners,
  updateAddedNote,
} from './create-note.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

//Renders Folders HTML
const hiddenFolders = [];

//Right Folder Sidebar Variables
let rightFolderSidebar = document.querySelector('.js-right-folder-info');
let rightSidebarOpen = false;
let folderOpened = folders.folderData[0].id;

export function renderFolderHTML() {
  let foldersHTML = '';

  folders.folderData.forEach((folder) => {
    let notesHTML = '';

    folder.notes.forEach((note) => {
      notesHTML += `
     
     <div class="note-container">
  <i class="bx bxs-x-circle delete-button js-delete-button" data-note-id="${note.id}" data-folder-id="${folder.id}"></i>
  <div  class = "note-send"onclick="location.href = 'note-editor.html?noteId=${note.id}&folderId=${folder.id}'">
    <div class="note-title"><i class="bx bx-note"></i>${note.name}</div>
    <div class="note-img-mock">
      ${note.content}
    </div>
  </div>
  <div class="last-edit">Last edited ${note.lastEdited}</div>
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

    document.querySelector('.notes').innerHTML = foldersHTML;
  });

  document.querySelectorAll('.js-folder-info-button').forEach((button) => {
    button.addEventListener('click', () => {
      const folderId = button.dataset.folderId;
      if (!rightSidebarOpen) {
        //If the right sidebar is not open
        rightFolderSidebar.classList.toggle('active'); //Toggle the right sidebar
        folderOpened = folderId; //Set the folder opened to the folder id
        rightSidebarOpen = true; //Declare that the right sidebar is open
        renderFolderInfoHTML(folderId); //Render the folder info
      } else if (rightSidebarOpen && folderOpened === folderId) {
        //If the right sidebar is open and the folder opened is the same as the folder id
        rightFolderSidebar.classList.toggle('active'); //Toggle the right sidebar off
        rightSidebarOpen = false; //Declare that the right sidebar is closed
        folderOpened = ''; //Set the folder opened to an empty string because the sidebar is closed
      } else if (rightSidebarOpen && folderOpened !== folderId) {
        //If the right sidebar is open and the folder opened is not the same as the folder id
        renderFolderInfoHTML(folderId); //Render the folder info
        folderOpened = folderId; //Set the folder opened to the folder id
      }
    });
  });

  let folderInfoCloseButton = document.querySelector(
    '.js-close-sidebar-button'
  );

  folderInfoCloseButton.onclick = function () {
    rightFolderSidebar.classList.toggle('active');
    rightSidebarOpen = false;
  };

  //Folder Buttons
  const folderDropDownButton = document.querySelectorAll(
    '.js-folder-dropdown-button'
  );
  const folderUpButton = document.querySelectorAll('.js-folder-up-button');

  folderDropDownButton.forEach((button) => {
    button.addEventListener('click', () => {
      const folderId = button.dataset.folderId;
      const container = document.querySelector(`.js-notes-grid-${folderId}`);
      container.classList.add('is-hiding-notes');

      if (!hiddenFolders.includes(folderId)) {
        hiddenFolders.push(folderId);
      }
    });
  });

  folderUpButton.forEach((button) => {
    button.addEventListener('click', () => {
      const folderId = button.dataset.folderId;
      const container = document.querySelector(`.js-notes-grid-${folderId}`);
      container.classList.remove('is-hiding-notes');

      if (hiddenFolders.includes(folderId)) {
        const index = hiddenFolders.indexOf(folderId);

        hiddenFolders.splice(index, 1);
      }
    });
  });

  hiddenFolders.forEach((hiddenFolderId) => {
    const container = document.querySelector(
      `.js-notes-grid-${hiddenFolderId}`
    );
    container.classList.add('is-hiding-notes');
  });

  //Folder info button
  if (folderOpened) {
    renderFolderInfoHTML(folderOpened);
  }

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
    <div class="note-container" onclick="location.href='note-editor.html?noteId=${notes.id}&folderId=${matchingFolder.id}'">
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

  document.querySelector('.js-data-container').innerHTML = foldersInfoHTML;
}

// Attach event listeners when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  attachDeleteButtonListeners();
});

document.addEventListener('DOMContentLoaded', function () {
  attachCreateNewNoteButtonListeners();
});

//END OF BUTTON FUNCTIONALLITY ^^^^

renderFolderHTML();
