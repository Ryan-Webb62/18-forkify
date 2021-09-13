import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderASpinner();

    // 1. Load recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// making an event array and iterating over it to create event listeners
['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);

// Replaces multiple eventlisteners hard coded
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
