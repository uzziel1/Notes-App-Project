//Delete button
export function attachDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach((button) => {
    button.removeEventListener('click', handleDeleteButtonClick);
    button.addEventListener('click', handleDeleteButtonClick);
  });
}

export function handleDeleteButtonClick(event) {
  const button = event.target;
  const folderId = button.dataset.folderId;
  const noteId = button.dataset.noteId;

  folders.deleteNoteFromFolder(folderId, noteId);
  renderFolderHTML();
}
