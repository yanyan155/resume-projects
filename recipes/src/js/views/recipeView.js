import {elements} from './base';
import {Fraction} from 'fractional';

export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
}
/* doesnt currect work */
export const highLightActive = (id) => {
  let results = Array.from(document.querySelectorAll('.results__link'));
  results.forEach(elem => elem.classList.remove('results__link--active'));
  if(document.querySelector(`a[href="#${id}"]`)) {
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
  }
}
export const rewriteQuantity = (serv, ingredients) => {
  // rewrite serving
  document.querySelector('.recipe__info-data--people').innerHTML = serv;

  // rewrite ingredient quantity
  const counts = Array.from(document.querySelectorAll('.recipe__count'));
  counts.forEach((elem, i) => {
    //const count = (ingredients[i])
    elem.innerHTML = calculCount(ingredients[i].count);
  });
}


const calculCount = (count) => {

  if(count == 0) {
    return '';
  }
  let newCount = +(count.toFixed(2));
  let value = (new Fraction(newCount)).toString();
  return value;
}

export const recipeRender = (recipe, isLiked) => {

  // create str 
  // then render to html
  const createList = (elem) => {
    const innerString = `
      <li class="recipe__item">
          <svg class="recipe__icon">
              <use href="img/icons.svg#icon-check"></use>
          </svg>
          <div class="recipe__count">${calculCount(elem.count)}</div>
          <div class="recipe__ingredient">
              <span class="recipe__unit">${elem.unit}</span>
              ${elem.description}
          </div>
      </li>
    `;
    return innerString;
  };

  const htmlString = `
    <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked? '':'-outlined' }"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">

            ${ recipe.ingredients.map((elem) => createList(elem)).join(' ')}
           
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
  `;
   elements.recipe.insertAdjacentHTML( 'beforeend', htmlString );
}