import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// parcel - keeps the state of the page
if (module.hot) {
  module.hot.accept();
}

async function controlRecipes() {
  try {
    // window.location - entire URL
    const id = window.location.hash.slice(1);

    // guard clause - modern way
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
    // if we exported the entire class
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

//publisher-subscriber pattern
function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();
