import View from './view';
import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = 'No recipes found';
  _succesMsg = '';

  _generateMarkup() {
    return this._data
      .map(searchResult => PreviewView.render(searchResult, false))
      .join('');
  }
}

export default new ResultsView();
