const notes = getSavedNotes();

function getSavedNotes() {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    const notesContainer = document.getElementById('notesList');
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>You don't have any notes</p>";
        return;
    }

    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.innerHTML = `
            <p>${note.text}</p>
            <small>${note.tags} | ${note.date}</small>
            <button onclick="deleteNote(${index})">Delete</button>
            <button onclick="editNote(${index})">Edit</button>
        `;
        notesContainer.appendChild(noteEl);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function editNote(index) {
    const newText = prompt('Edit your note:', notes[index].text);
    if (newText !== null) {
        notes[index].text = newText;
        saveNotes();
        renderNotes();
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        getSavedNotes,
        renderNotes,
        deleteNote,
        editNote,
        notes
    };
}
