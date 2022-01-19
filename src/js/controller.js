import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView';
import searchview from './views/searchView';
import resultsView from './views/resultsView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);
    // render recipe
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchview.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // load result
    await model.loadSearchResults(query);
    // render result
    resultsView.render(model.getSearchResultsPage());

    // render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    resultsView.renderError();
  }
};

const controlPagination = function (btnDataSet) {
  resultsView.render(model.getSearchResultsPage(btnDataSet));
  paginationView.render(model.state.search);
};

const controlServings = function (val) {
  model.updateServings(val);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show spinner
    addRecipeView.renderSpinner();
    // wait for recipe upload
    await model.uploadRecipe(newRecipe);
    // render success
    addRecipeView.renderSuccess();

    // update bookmarks, recipeView and url
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    recipeView.render(model.state.recipe);

    setTimeout(function () {
      //bug toggles window back open if u close it
      //addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  paginationView.addHandlerBtnClick(controlPagination);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerbookmark(controlAddBookmark);
  searchview.addHandlerOnSearch(controlSearchResults);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
