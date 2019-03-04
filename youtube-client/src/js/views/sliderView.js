export const renderPadinbation = (page) => {
  const markup = `
    <div class='pagination-wrap'>
      <ul class='pagination'>
        <li class='active' data-nth='0'><span>${page + 1}</span></li>
        <li data-nth='1'><span>${page + 1}</span></li>
        <li data-nth='2'><span>${page + 1}</span></li>
      </ul>
    </div>
    `;
  document.querySelector('.wrap').insertAdjacentHTML('beforeend', markup);
};
export const changePage = (page) => {
  const domSpans = document.querySelectorAll('.pagination span');
  const arraySpans = Array.from(domSpans);
  arraySpans.forEach((elem) => {
    elem.innerHTML = page + 1;
  });
};
export const changeActiveLi = (nthLi) => {
  const domSpans = document.querySelectorAll('.pagination li');
  const arraySpans = Array.from(domSpans);
  arraySpans.forEach((elem, i) => {
    elem.classList.remove('active');
    if (i === nthLi) {
      elem.classList.add('active');
    }
  });
};
const draw = (progress, direction) => {
  const value = `${progress * 100}%`;
  document.querySelector('.content-wrapper').style[direction] = value;
};
const drawPage = (progress, elem) => {
  const value = 1 - progress;
  elem.style.opacity = value;
};
export const animate = (options) => {
  const start = performance.now();
  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;
    const progress = options.timing(timeFraction);
    if (options.direction) {
      draw(progress, options.direction);
    } else if (options.domElem) {
      drawPage(progress, options.domElem);
    }
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
export const pullClipsWrap = (delta) => {
  const domClipsWrap = document.querySelector('.content-wrapper');
  domClipsWrap.style.right = `${delta}px`;
};
