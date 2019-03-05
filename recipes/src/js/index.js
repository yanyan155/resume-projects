// Global app controller
import Search from './models/Search';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements, renderSpinner, delSpinner} from './views/base';
import Recipe from './models/Recipe';
// add event listener
let state = {};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchCtrl();
})

// search controller
const searchCtrl = async () => {
  // get query from view
  let query = searchView.getInput();

  if(query) {

    // new search obj
    state.search = new Search(query);
    // prepare UI to show results
    searchView.clearInput();
    searchView.clearResults();
    renderSpinner(elements.resultsBlock);
    // search recipes
    try {
      await state.search.httpRequest();
      // render pesults on UI
      delSpinner();
      searchView.renderResults(state.search.result);

    } catch(error) {
      console.log(error);
      alert('Something wrong with search');
    } 
  }
}
elements.paginPages.addEventListener('click', e => {

  let target = e.target;
  let button = target.closest('.btn-inline');
  
  if(button) {
    let page = parseInt(button.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, page);
  }
})

// recipe controller
const recipeCtrl = async () => {

  let id = window.location.hash.slice(1);
  if(id) {
    // prepare UI for changes
    recipeView.highLightActive(id);
    recipeView.clearRecipe();
    renderSpinner(elements.recipe);
    // create recipe obj
    state.recipe  = new Recipe(id);
    try {
      // wait for responce
      await state.recipe.httpRequest();
      // contain data to html string
      state.recipe.calcTime();
      state.recipe.calcServing();
      state.recipe.rewriteIngredients();
      // update UI with data
      delSpinner();
      recipeView.recipeRender(
        state.recipe,
        state.likes.isLiked(id));
    } catch(error) {
      console.log(error);
      alert('Something wrong with search');
    }

  } 
}
const listCtrl = () => {
  // create new list if it doesn't exist
  if(!state.list) {
    state.list = new List();
  }
  // add items to list
  state.recipe.ingredients.forEach(elem => {
    let item = state.list.create(elem.count, elem.unit, elem.description);
    listView.renderItem(item);
  })
}

const likesCtrl = () => {
  // create new like if it doesn't exist
  const id = state.recipe.id;
  if(!state.likes) {
    state.likes = new Likes();
  }
  // if it not liked 
  if(!state.likes.isLiked(id)) {

    // update likes

    const title = state.recipe.title;
    const author = state.recipe.publisher;
    const image = state.recipe.image;
    
    state.likes.create(id, title, author, image);

    // button toogle
    likesView.toogleLikeButton(true);

    likesView.toogleLikesListButton(state.likes.arr.length);

    // render new likes list
    likesView.renderLike(id, title, author, image);

  // if it liked already
  } else {   
    // delete like item
    state.likes.delete(id)
    // button toogle
    likesView.toogleLikeButton(false);
    likesView.toogleLikesListButton(state.likes.arr.length);
    // render new likes list
    likesView.deleteLike(id);
  }
}

["hashchange", "load"].forEach(event => window.addEventListener(event , recipeCtrl));

window.addEventListener('load', (event) => {

  state.likes = new Likes();
  state.likes.arr = state.likes.getFromLocalStorage() || [];

  likesView.toogleLikesListButton(state.likes.arr.length);

  state.likes.arr.forEach(elem => {
    likesView.renderLike(elem.id,elem.title,elem.author,elem.img);
  }) 
});

document.querySelector('.recipe').addEventListener('click', (event) => {
  if(event.target.matches(".btn-decrease, .btn-decrease * ")) {
    if(state.recipe.serving > 1) {
      state.recipe.recountIngredients('dec');
      recipeView.rewriteQuantity(state.recipe.serving, state.recipe.ingredients);
    }
  }else if(event.target.matches(".btn-increase, .btn-increase * ")) {
    state.recipe.recountIngredients('inc');
    recipeView.rewriteQuantity(state.recipe.serving, state.recipe.ingredients);
  } else if(event.target.matches(".recipe__btn--add, .recipe__btn--add * ")) {
    listCtrl();
  } else if(event.target.matches(".recipe__love, .recipe__love * ")) {
    likesCtrl();
  }
})
document.querySelector('.shopping__list').addEventListener('click', (event) => {

  if(event.target.matches(".shopping__delete, .shopping__delete * ")) {

    let li = event.target.closest(".shopping__item");
    let id = li.dataset.itemid;
    listView.deleteItem(li);
    state.list.delete(id);
  } else if(event.target.matches(".change-shopping-count")) {

    // add event update on button
    
    let value = parseFloat(event.target.value);
    let id = event.target.closest(".shopping__item").dataset.itemid;
    state.list.updateCount(id, value);
  }
})
