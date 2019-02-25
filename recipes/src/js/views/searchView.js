import {elements} from './base'

export const getInput = () => elements.searchInput.value;

export const cutTitle = (title, limit = 17) => {

  let words = [];
  let array = title.split(' ');

  array.reduce( (acc, cur) => {
    if(acc < limit) {
      words.push(cur);
    }
    return acc + cur.length;
  }, 0)
  return `${words.join(' ')} ...`;
}

const renderRecipe = recipe => {
  const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${cutTitle(recipe.title, 13)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
  `;
  elements.renderRecipesList.insertAdjacentHTML( 'beforeend', markup );
}

const createButton = (page, type) => {
  
                return `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1 } >
                    <span>Page ${type === 'prev' ? page-1 : page+1 }</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
                    </svg>
                    
                </button>`                
}

const renderButtons = (page, resCount, resPerPage) => {

  const pages = Math.ceil(resCount/resPerPage);
  let button;

  if(page === 1 && pages > 1) {
    // show next buttons
    button = createButton(page, 'next');

  }else if(page === pages && pages > 1) {
    // show prev buttons
    button = createButton(page, 'prev');

  } else if(page < pages) {
    // show both buttons
    button = `${createButton(page, 'prev')}
              ${createButton(page, 'next')}`;
  }
  elements.paginPages.insertAdjacentHTML( 'afterbegin', button );
}
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1)*resPerPage;
  const end = page*resPerPage;
  recipes.slice(start, end).forEach( el => renderRecipe(el));
  renderButtons(page, recipes.length, resPerPage);
}

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
  elements.renderRecipesList.innerHTML = '';
  elements.paginPages.innerHTML = '';
};
