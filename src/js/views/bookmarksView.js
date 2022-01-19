import PreviewView from './previewView.js';
import View from './View.js';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = 'No Bookmarks yet';
  _succesMsg = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
