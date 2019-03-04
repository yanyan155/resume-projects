const cutDate = (string) => {
  const index = string.indexOf('T');
  return string.slice(0, index);
};
export const renderClip = (id, image, title, author, views, date, description) => {
  const markup = `
      <div class='clip-item' data-videoId='${id}'>
        <img src='${image}' alt='${title}' width='100' height='100'>
        <a href='https://www.youtube.com/watch?v=${id}' title='${title}'>${title}</a>
        <p class='clip-item-author'><i aria-hidden='true'></i>Author: ${author}</p>
        <p class='clip-item-views'><i aria-hidden='true'></i>Views: ${views}</p>
        <p class='clip-item-date'><i aria-hidden='true'></i>Date: ${cutDate(date)}</p>
        <p class='clip-item-description'>${description}</p>
      </div>
    `;
  document.querySelector('.content-wrapper').insertAdjacentHTML('beforeend', markup);
};
export const renderClipWrap = (array) => {
  const markupWrap = "<div class='content-wrapper'></div>";
  document.querySelector('.wrap').insertAdjacentHTML('beforeend', markupWrap);
  array.forEach((item) => {
    renderClip(item.id, item.image, item.title, item.author, item.views, item.date, item.description);
  });
};
export const deleteClips = () => {
  const domWrapper = document.querySelector('.content-wrapper');
  if (domWrapper) {
    domWrapper.parentElement.removeChild(domWrapper);
  }
};
