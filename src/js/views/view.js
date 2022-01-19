import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the recieved object to the dom
   * @param {object | Object []} data the data to be rendered (e.g. a recipe)
   * @param {boolean} [render = true] if false, creates markup string instead of rendering to the dom
   * @returns {undefined | String}
   * @this {Object} View Instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const html = this._generateMarkup();

    if (!render) return html;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const html = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(html);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      if (!curEl.isEqualNode(newEl) && newEl.firstChild?.nodeValue.trim() != '')
        curEl.textContent = newEl.textContent;

      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner = function () {
    const html = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  };

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSuccess(msg = this._succesMsg) {
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(msg = this._errorMsg) {
    console.log(this, this._parentElement);
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
