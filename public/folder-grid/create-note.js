import { folders } from '../data/folder.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderFolderHTML } from './folder-grid.js';

const addedMessageTimeouts = {};

export function attachCreateNewNoteButtonListeners() {
  const openModals = document.querySelectorAll('.js-folder-add-note');
  openModals.forEach((button) => {
    button.addEventListener('click', handleNewNoteButtonClick);
  });
}

export function handleNewNoteButtonClick(event) {
  const button = event.target;
  const folderId = button.dataset.folderId;
  const form = document.querySelector('.form');
  const modal = document.querySelector('.create-new-note');

  // Clear the noteTitle input field
  document.querySelector('.js-note-title').value = '';

  modal.showModal();

  const handleFormSubmit = () => {
    let noteTitle = document.querySelector('.js-note-title').value;
    folders.addNoteToFolder(
      {
        id: `id${Date.now()}`,
        name: noteTitle,
        content: '',
        lastEdited: `${dayjs().format('MMMM D, YYYY')}`,
      },
      folderId
    );

    renderFolderHTML();
    updateAddedNote(folderId);
    noteTitle = '';
    form.removeEventListener('submit', handleFormSubmit);
  };

  form.addEventListener('submit', handleFormSubmit);
}

export function updateAddedNote(folderId) {
  document
    .querySelector(`.js-note-added-${folderId}`)
    .classList.add('note-is-visible');

  const previousTimeoutId = addedMessageTimeouts[folderId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    document
      .querySelector(`.js-note-added-${folderId}`)
      .classList.remove('note-is-visible');
  }, 1500);

  addedMessageTimeouts[folderId] = timeoutId;
}
