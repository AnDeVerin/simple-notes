/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */

import { NOTE_COLORS } from '../constants.js';
import Component from '../component.js';
import ColorSelector from './colorSelector.js';

const noteTemplate = document.querySelector('[data-component="note"]');

export default class Note extends Component {
  constructor({ parent, note }) {
    const noteFragment = noteTemplate.content.cloneNode(true);
    noteFragment.querySelector('li').setAttribute('data-id', note.id);
    parent.appendChild(noteFragment);

    super(parent.querySelector(`[data-id="${note.id}"]`));

    this._id = note.id;

    this._colorSelector = new ColorSelector({
      parent: this._element,
    });

    this._text = this._element.querySelector('.note__text');
    this._editButton = this._element.querySelector('.edit-button');
    this._colorButton = this._element.querySelector('.color-button');
    this._removeButton = this._element.querySelector('.remove-button');

    this.updateNoteView(note);

    this._editButton.addEventListener('click', () => {
      this.trigger('note.edit', { id: this._id }, true);
    });

    this._colorButton.addEventListener('click', () => {
      this._colorSelector.show();
    });

    this._removeButton.addEventListener('click', () => {
      this.trigger('note.remove', { id: this._id }, true);
    });

    this._colorSelector.on('color.selected', ({ detail }) => {
      const { color } = detail;
      this.trigger('note.color', {
        id: this._id,
        color: NOTE_COLORS[color],
      }, true);
    });
  }

  removeElement() {
    this._element.remove();
  }

  updateNoteView(note) {
    this._text.textContent = note.text;
    this._element.style.setProperty('--note-bg', note.bg);
  }
}
