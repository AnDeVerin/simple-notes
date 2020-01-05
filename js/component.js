/* eslint-disable no-underscore-dangle */

export default class Component {
  constructor(element) {
    this._element = element;
  }

  show() {
    this._element.classList.remove('js-hidden');
  }

  hide() {
    this._element.classList.add('js-hidden');
  }

  on(eventName, handler) {
    this._element.addEventListener(eventName, handler);
  }

  trigger(eventName, data, bubbles = false) {
    const myEvent = new CustomEvent(eventName, {
      detail: data,
      bubbles,
    });

    this._element.dispatchEvent(myEvent);
  }
}
