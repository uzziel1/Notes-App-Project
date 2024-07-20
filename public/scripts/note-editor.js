import { folders } from '../data/folder.js';

const url = new URL(window.location.href);
const { noteId, folderId } = {
  noteId: url.searchParams.get('noteId'),
  folderId: url.searchParams.get('folderId'),
};

const note = folders.getNote(folderId, noteId);
