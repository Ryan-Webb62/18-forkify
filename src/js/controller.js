import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import getQuery from './views/searchView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderASpinner();

    // 1. Load recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderASpinner();
    // 1. get search query
    const query = SearchView.getQuery();
    if (!query) return;

    //2 Load search results
    await model.loadSearchResults(query);
    //3 Render results
    // console.log(model.state.search.results);
    // ResultsView.render(model.state.search.results);
    // console.log(model.getSearchResultsPage(1));

    resultsView.render(model.getSearchResultsPage(1));
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
