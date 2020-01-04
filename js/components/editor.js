/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */

import { NOTE_COLORS } from '../constants.js';
import Component from '../component.js';
import ColorSelector from './colorSelector.js';

export default class Editor extends Component {
  constructor({ element }) {
    super(element);

    this._currentNote = {};

    this._colorSelector = new ColorSelector({
      root: this._element.querySelector('.editor__buttons'),
    });

    this._title = this._element.querySelector('.editor__title');
    this._input = this._element.querySelector('.editor__input');
    this._container = this._element.querySelector('.editor__content');
    this._okButton = this._element.querySelector('.ok-button');
    this._colorButton = this._element.querySelector('.color-button');
    this._cancelButton = this._element.querySelector('.cancel-button');

    this._colorButton.addEventListener('click', () => {
      this._colorSelector.show();
    });

    this._cancelButton.addEventListener('click', () => {
      this.hide();
      this._clearEditor();
    });

    this._colorSelector.on('color.selected', ({ detail }) => {
      const { color } = detail;
      this._setEditorBackground(NOTE_COLORS[color]);
    });
  }

  show({ id = null }) {
    console.log('id:', id);

    if (!id) {
      this._title.innerHTML = 'New note';
      this._setEditorBackground(NOTE_COLORS.default);
    }

    this._element.classList.remove('js-hidden');
    this._input.focus();
  }

  _setEditorBackground(color) {
    this._currentNote.bg = color;
    this._container.style.setProperty('--note-bg', color);
  }

  _clearEditor() {
    this._input.value = '';
    this._currentNote = {};
  }
}
