/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */

import Component from '../component.js';

export default class AddButton extends Component {
  constructor({ element }) {
    super(element);

    this._element.addEventListener('click', () => {
      this.trigger('new.note', '');
    });
  }
}
