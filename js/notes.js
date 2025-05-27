const notesContainer = document.getElementById('notesList');
const notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    notesContainer.innerHTML = '';
    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>You don't have any notes.</p>";
    } else {
        notes.forEach((note, index) => {
            const div = document.createElement('div');
            div.className = 'note';
            div.innerHTML = `
                <p>${note.text}</p>
                <small><strong>Tags:</strong> ${note.tags}</small><br>
                <small>${note.date}</small><br>
                <button onclick="editNote(${index})" class="btn">Edit</button>
                <button onclick="deleteNote(${index})" class="btn btn-delete">Delete</button>
            `;
            notesContainer.appendChild(div);
        });
    }
}

renderNotes();
