/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import Component from '../component.js';

export default class ColorSelector extends Component {
  constructor({ root }) {
    const colSelTemplate = document.querySelector('[data-component="color-selector"]');
    const colSelFragment = colSelTemplate.content.cloneNode(true);

    root.appendChild(colSelFragment);

    super(root.querySelector('.color-buttons'));

    this._element.addEventListener('click', ({ target }) => {
      this._selectColor(target.dataset);
    });
  }

  _selectColor({ color }) {
    this.trigger('color.selected', { color });
    this.hide();
  }
}
