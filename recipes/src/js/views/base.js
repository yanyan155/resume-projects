export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  renderRecipesList: document.querySelector('.results__list'),
  resultsBlock: document.querySelector('.results'),
  paginPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  serving: document.querySelector('.recipe__info-data--people'),
  shoppingList: document.querySelector('.shopping__list'),
  buttonLikes: document.querySelector('.likes'),
  likesList: document.querySelector('.likes__list')
}; 

export const renderSpinner = (parent) => {
  let loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
  `;
  parent.insertAdjacentHTML( 'afterbegin', loader );
};

export const delSpinner = () => {
  let loader = document.querySelector('.loader');
  loader.parentNode.removeChild(loader);
};
