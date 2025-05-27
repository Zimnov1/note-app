const notesContainer = document.getElementById("notesList");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
    notesContainer.innerHTML = "";
    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>You don't have any notes.</p>";
    } else {
        notes.forEach((note, index) => {
            const div = document.createElement("div");
            div.className = "note";
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

function editNote(id) {
    window.location.href = `note-edit.html?id=${id}`;
}

function deleteNote(id) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(id, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    }
}

renderNotes();
