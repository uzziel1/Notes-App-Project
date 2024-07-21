import { folders } from '../data/folder.js';

const url = new URL(window.location.href);
const { noteId, folderId } = {
  noteId: url.searchParams.get('noteId'),
  folderId: url.searchParams.get('folderId'),
};

const note = folders.getNote(folderId, noteId);

let optionsButtons = document.querySelectorAll('option-button');
let advanceOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

//List of fontlist

let fontList = [
  'Arial',
  'Verdana',
  'Times New Roman',
  'Garamond',
  'Georgia',
  'Courier New',
  'Cursive',
];

//Initial Settings
const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);
};

//Highlighter clicked button
const highlighter = (className, needsRemoval) {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            // needsRemoval = true means only one button should be highlighted and the other would be normal
            if (needsRemoval) {
                let alreadyActive = false;
                //If currently clicked button is alreadyActive 
                if (button.classList.contains('active')) {
                    alreadyActive = true;
                }
            }
        })
    })
}

