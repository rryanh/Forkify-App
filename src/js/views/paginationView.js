import View from './view';
import icons from 'url:../../img/icons.svg';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage;
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    this._currentPage = this._data.page;
    // first page
    if (this._data.page === 1 && numPages > 1) {
      return this._nextsbtn();
    }

    // middle page
    if (this._data.page < numPages) {
      return this._previousbtn() + this._nextsbtn();
    }

    // lastpage
    if (this._data.page === numPages && numPages > 1) {
      return this._previousbtn();
    }
    // first page no other pages
    return '';
  }
  _previousbtn() {
    return `
    <button data-goto="${
      this._currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${this._currentPage - 1}</span>
    </button>
    `;
  }
  _nextsbtn() {
    return `
   <button data-goto="${
     this._currentPage + 1
   }" class="btn--inline pagination__btn--next">
      <span>${this._currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }
  addHandlerBtnClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new Pagination();
