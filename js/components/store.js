/* eslint-disable no-underscore-dangle */


const INIT_NOTES = [
  { id: 1, text: 'Note #1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.', bg: '#f5d2b4' },
  { id: 2, text: 'Note #2. Beatae, distinctio quam?', bg: '#f7bebb' },
  { id: 3, text: 'Note #3.', bg: '#ddf3b0' },
];

export default class Store {
  constructor() {
    this._notes = INIT_NOTES;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    return this._notes.find((note) => note.id === id);
  }

  insertNote(note) {
    this._notes.push(note);
  }

  updateNote(note) {
    const currentNote = this.getNoteById(note.id);
    if (!currentNote) {
      return;
    }

    currentNote.text = note.text;
    currentNote.bg = note.bg;
  }

  removeNote(id) {
    this._notes = this._notes.filter((note) => note.id !== id);
  }
}
