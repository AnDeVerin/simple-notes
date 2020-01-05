/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import Component from '../component.js';
import AddButton from './addButton.js';
import Editor from './editor.js';
import Store from './store.js';
import Note from './note.js';

export default class App extends Component {
  _initComponents() {
    this._addButton = new AddButton({
      element: this._element.querySelector('[data-component="add-button"]'),
    });

    this._editor = new Editor({
      element: this._element.querySelector('[data-component="editor"]'),
    });

    this._store = new Store();
  }

  constructor({ element }) {
    super(element);
    this._notes = {};

    this._initComponents();
    this._renderNotes();

    this._addButton.on('new.note', () => {
      this._editor.show({});
    });

    this._editor.on('note.updated', ({ detail }) => {
      if (detail.id) {
        this._updateNote(detail);
        return;
      }

      this._createNote(detail);
    });

    this.on('note.remove', ({ detail }) => {
      this._removeNote(detail.id);
    });

    this.on('note.edit', ({ detail }) => {
      const note = this._store.getNoteById(detail.id);
      this._editor.show(note);
    });

    this.on('note.color', ({ detail }) => {
      const { id, color: bg } = detail;
      const note = this._store.getNoteById(id);
      const updateNote = { ...note, bg };
      this._updateNote(updateNote);
    });
  }

  _renderNotes() {
    const notes = this._store.getNotes();
    notes.forEach((note) => {
      this._renderNoteComponent(note.id);
    });
  }

  _renderNoteComponent(id) {
    const newNote = this._store.getNoteById(id);
    const newNoteComponent = new Note({
      parent: this._element.querySelector('.notes'),
      note: newNote,
    });

    this._notes[id] = newNoteComponent;
  }

  _updateNote(note) {
    this._store.updateNote(note);
    const updatedNote = this._store.getNoteById(note.id);
    this._notes[note.id].updateNoteView(updatedNote);
  }

  _createNote(note) {
    const newId = Date.now();
    this._store.insertNote({
      id: newId,
      text: note.text,
      bg: note.bg,
    });

    this._renderNoteComponent(newId);
  }

  _removeNote(id) {
    this._store.removeNote(id);
    this._notes[id].removeElement();
    delete this._notes[id];
  }
}
