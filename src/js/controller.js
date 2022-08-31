import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////

async function controlRecipes() {
  try {
    // window.location - entire URL
    const id = window.location.hash.slice(1);
    console.log(id);

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
    alert(err);
  }
}

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
