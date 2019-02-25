import {elements} from './base';

export const renderItem = (item) => {
  let markup = `<li class="shopping__item" data-itemid="${item.id}">
                    <div class="shopping__count">
                        <input type="number" value="${item.count}" step="${item.count}" class="change-shopping-count">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.description}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>`;
  elements.shoppingList.insertAdjacentHTML( 'beforeend', markup );
};

export const deleteItem = (elem) => {
  elements.shoppingList.removeChild(elem);
};