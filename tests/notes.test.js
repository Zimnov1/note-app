const {
    getSavedNotes,
    renderNotes,
    deleteNote,
    editNote,
    notes
} = require('../js/notes');

describe('Note App', () => {
    let notesContainer;

    beforeEach(() => {
        document.body.innerHTML = `<div id="notesList"></div>`;
        notesContainer = document.getElementById('notesList');
        localStorage.clear();
        notes.length = 0; 
    });

    it('getSavedNotes should return [] when localStorage is empty', () => {
        expect(getSavedNotes()).toEqual([]);
    });

    it('renderNotes should show "no notes" when notes are empty', () => {
        renderNotes();
        expect(notesContainer.innerHTML).toContain("You don't have any notes");
    });

    it('renderNotes should display all notes', () => {
        notes.push({ text: 'Note 1', tags: 'tag1', date: '2025-01-01' });
        notes.push({ text: 'Note 2', tags: 'tag2', date: '2025-01-02' });
        renderNotes();

        expect(notesContainer.children.length).toBe(2);
        expect(notesContainer.innerHTML).toContain('Note 1');
        expect(notesContainer.innerHTML).toContain('tag2');
    });

    it('deleteNote should remove note and re-render', () => {
        notes.push({ text: 'Note A', tags: 'tagA', date: '2025-01-01' });
        notes.push({ text: 'Note B', tags: 'tagB', date: '2025-01-02' });
        renderNotes();

        deleteNote(0);
        expect(notes.length).toBe(1);
        expect(notesContainer.innerHTML).not.toContain('Note A');
        expect(notesContainer.innerHTML).toContain('Note B');
    });

    it('editNote should update note text', () => {
        notes.push({ text: 'Old text', tags: 'x', date: '2025-01-01' });
        renderNotes();

        jest.spyOn(window, 'prompt').mockReturnValue('New edited text');
        editNote(0);

        expect(notes[0].text).toBe('New edited text');
        expect(notesContainer.innerHTML).toContain('New edited text');
    });
});
