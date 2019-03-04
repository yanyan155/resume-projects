export const getInput = () => document.querySelector('.search-form input').value;

export const renderSearchForm = () => {
  const markup = `
    <div class='wrap'>
      <form action='#' class='search-form'>
        <input type='text' placeholder='type here request'>
        <button type='submit'>Search</button>
      </form>
    </div>
    `;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
};

export const clearSearchInput = () => {
  document.querySelector('.search-form input').value = '';
};
