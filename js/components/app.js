/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */

import AddButton from './addButton.js';
import Editor from './editor.js';

export default class App {
  _initComponents() {
    this._addButton = new AddButton({
      element: this._element.querySelector('[data-component="add-button"]'),
    });

    this._editor = new Editor({
      element: this._element.querySelector('[data-component="editor"]'),
    });
  }

  constructor({ element }) {
    this._element = element;

    this._initComponents();

    this._addButton.on('new.note', () => {
      console.log('addButton click!');
      this._editor.show({});
    });
  }
}
