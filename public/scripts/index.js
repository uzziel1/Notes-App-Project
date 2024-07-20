// import { notes } from "./data/note.js";
import { folders } from '../data/folder.js';
import { updateClock } from './utils/clock.js';
import { renderFolderHTML } from './folder-grid/folder-grid.js';

//Updating Clock Element
const clockIntervalId = setInterval(updateClock, 1000);

//START OF BUTTON FUNCTIONALITY
//
let btn = document.querySelector('#btn');
let header = document.querySelector('.header');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function () {
  sidebar.classList.toggle('active');

  header.classList.toggle('active');
};

//Create New Folder Sidebar Button
document.querySelector('.js-create-folder').addEventListener('click', () => {
  const form = document.querySelector('.js-folder-title-form');
  const modal = document.querySelector('.js-create-new-folder');

  // Clear the noteTitle input field
  document.querySelector('.js-new-folder-title').value = '';

  modal.showModal();

  const handleFormSubmit = () => {
    let folderTitle = document.querySelector('.js-new-folder-title').value;
    folders.addNewFolder(folderTitle);

    renderFolderHTML();

    folderTitle = '';
    form.removeEventListener('submit', handleFormSubmit);
  };

  form.addEventListener('submit', handleFormSubmit);
});
