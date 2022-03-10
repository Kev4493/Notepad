let noteTitles = [];
let notes = [];
let trashNoteTitles = [];
let trashNotes = [];

load();

// Content Container rendern

function renderNotes() {
    let content = document.getElementById('content'); // DIV an Variable binden.
    content.innerHTML = ``; // DIV leeren

    for (let i = 0; i < noteTitles.length; i++) {
        const noteTitle = noteTitles[i];
        const note = notes[i];
        content.innerHTML += CardTemplate(noteTitle, note, i);
    }

    document.getElementById('menu-notes-link').classList.add("highlight-active-links")
    document.getElementById('menu-trash-link').classList.remove("highlight-active-links")
}


// Template

function CardTemplate(title, note, index){
return `
    <div class="note-card">
        <img onclick="deleteNote(${index})" class="x-icon" src="./icons/x.png" alt="delete-icon" title="Diese Notiz löschen">
        <div class="note-title-container">
            <b class="note-title">${title}</b>
        </div>
        <div class="note-container">
            <i>${note}</i>
        </div>
    </div>
`;}

// Eine Notiz hinzufügen

function addNote() {
    let noteTitle = document.getElementById('note-title');
    let note = document.getElementById('note-text')

    if (noteTitle.value == '' || note.value == '') {
        alert("Bitte gib einen Titel und eine Notiz ein.");
    }
    else {

    noteTitles.push(noteTitle.value);
    notes.push(note.value);

    renderNotes();
    save();

    noteTitle.value = ``;
    note.value = ``;
    }
}

// Einzelne Notiz löschen

function deleteNote(i) {

    let title = noteTitles.splice(i, 1);
    let note = notes.splice(i, 1);

    trashNoteTitles.push(title);
    trashNotes.push(note);

    renderNotes();
    save();
}

// Einzelne Trash-Notiz löschen

function deleteTrashNote(i) {

    trashNoteTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrashNotes();
    save();
}

// Notizen und Trash-Notizen in den LocalStorage speichern

function save() {
    let noteTitlesAsText = JSON.stringify(noteTitles);
    localStorage.setItem('Notes', noteTitlesAsText);

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('Note Title', notesAsText);

    let trashNoteTitlesAsText = JSON.stringify(trashNoteTitles);
    localStorage.setItem('Trash-Note-Titles', trashNoteTitlesAsText);

    let trashNotesAsText = JSON.stringify(trashNotes);
    localStorage.setItem('Trash-Notes', trashNotesAsText);
}

// Notizen aus dem LocalStorag laden

function load() {
    let noteTitlesAsText = localStorage.getItem('Notes')
    let notesAsText = localStorage.getItem('Note Title')

    let trashNoteTitlesAsText = localStorage.getItem('Trash-Note-Titles');
    let trashNotesAsText = localStorage.getItem('Trash-Notes');

    if (noteTitlesAsText && notesAsText) {

        noteTitles = JSON.parse(noteTitlesAsText);
        notes = JSON.parse(notesAsText);
    }

    if (trashNoteTitlesAsText && trashNotesAsText) {

        trashNoteTitles = JSON.parse(trashNoteTitlesAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}

// Alle Notizen löschen

function deleteAllNotes() {
    noteTitles.splice(0, noteTitles.length);
    notes.splice(0, notes.length);

    renderNotes();
    save();
}

// Menü öffnen und schließen

function showMenu() {
    document.getElementById('overlay-menu').classList.toggle('show-overlay-menu')
}

function hideMenu() {
    document.getElementById('overlay-menu').classList.remove('show-overlay-menu')
}



// Trash 

function renderTrashNotes() {

    document.getElementById('content').innerHTML = '';

    for (let i = 0; i < trashNoteTitles.length; i++) {

        let trashNoteTitle = trashNoteTitles[i];
        let trashNote = trashNotes[i];

        document.getElementById('content').innerHTML += trashCardTemplate(trashNote, trashNoteTitle, i);
    }

    document.getElementById('menu-notes-link').classList.remove("highlight-active-links");
    document.getElementById('menu-trash-link').classList.add("highlight-active-links")
}

// Template

function trashCardTemplate(note, title, index) {
    return `<div class="note-card trash">
                <img onclick="deleteTrashNote(${index})" class="x-icon" src="./icons/x.png" alt="delete-icon" title="Diese Notiz löschen">
                <div class="note-title-container">
                    <b class="note-title">${title}</b>
                </div>
                <div class="note-container">
                    <i>${note}</i>
                </div>
            </div>
        `;
}
