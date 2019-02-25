import {elements} from './base';
import {cutTitle} from './searchView';

export const toogleLikeButton = (isLiked) => {

  const path = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${path}`);
  
}

export const toogleLikesListButton = (length) => {

  const vision = length>0 ? 'visible' : 'hidden';
  elements.buttonLikes.style.visibility = vision;
}

export const renderLike = (id, title, author, image) => {
  const markup = `<li>
                    <a class="likes__link" href="#${id}">
                      <figure class="likes__fig">
                          <img src="${image}" alt="${cutTitle(title, 13)}">
                      </figure>
                      <div class="likes__data">
                          <h4 class="likes__name">${title}</h4>
                          <p class="likes__author">${author}</p>
                      </div>
                    </a>
                  </li>`;
  elements.likesList.insertAdjacentHTML( 'beforeend', markup );
}
export const deleteLike = (id) => {
  
  let DOMli = document.querySelector(`.likes__link[href="#${id}"]`).parentNode;
  if(DOMli.parentNode) {
    DOMli.parentNode.removeChild(DOMli);
  }
}