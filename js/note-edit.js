const params = new URLSearchParams(window.location.search);
const noteId = params.get('id');

const notes = JSON.parse(localStorage.getItem('notes')) || [];

if (noteId !== null && notes[noteId]) {
    document.getElementById('note').value = notes[noteId].text;
    document.getElementById('tags').value = notes[noteId].tags;
}

document.getElementById('noteForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const text = document.getElementById('note').value.trim();
    const tags = document.getElementById('tags').value.trim();

    if (!text) return;

    const newNote = {
        text,
        tags,
        date: new Date().toLocaleString('uk-UA'),
    };

    if (noteId !== null && notes[noteId]) {
        notes[noteId] = newNote;
    } else {
        notes.push(newNote);
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.href = 'notes.html';
});
