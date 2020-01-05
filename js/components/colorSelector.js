/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import Component from '../component.js';

const colSelTemplate = document.querySelector('[data-component="color-selector"]');
export default class ColorSelector extends Component {
  constructor({ parent }) {
    const colSelFragment = colSelTemplate.content.cloneNode(true);

    parent.appendChild(colSelFragment);

    super(parent.querySelector('.color-buttons'));

    this._element.addEventListener('click', ({ target }) => {
      const { color } = target.dataset;
      if (!color) {
        return;
      }
      this._selectColor(color);
    });
  }

  _selectColor(color) {
    this.trigger('color.selected', { color });
    this.hide();
  }
}
