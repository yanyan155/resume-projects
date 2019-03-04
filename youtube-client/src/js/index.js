import Search from './models/Search';
import * as searchView from './views/searchView';
import Clips from './models/Clips';
import * as clipsView from './views/clipsView';
import Slider from './models/Slider';
import * as sliderView from './views/sliderView';
import Swipe from './models/Swipe';

const state = {};

const AnimationFrame = () => {
  const requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
};

const searchController = async () => {
  const query = searchView.getInput();
  if (query) {
    state.search = new Search(query);
    searchView.clearSearchInput();
    clipsView.deleteClips();
    await state.search.httpRequestSearch();
    sliderController(false);
    clipsController(state.slider.idsToLoad, true);
  }
};

const clipsController = async (array, isNeedCreateNewObj) => {
  if (!state.clips || isNeedCreateNewObj) {
    state.clips = new Clips(array);
  }
  const clipdata = await state.clips.httpRequestClips(array);
  setTimeout(() => {
    clipdata.forEach(elem => state.clips.createClip(elem));
    clipsView.deleteClips();
    clipsView.renderClipWrap(state.clips.clips.slice(state.slider.firstItemCount, state.slider.lastItemCount));
  }, 300);
};

const sliderController = (isResizeEvent) => {
  const isNeedRacalculate = state.slider.calculateItemsPerPage();
  if (isNeedRacalculate) {
    state.slider.recalcilatePageAndNthLi();
  }
  if (!isResizeEvent || (isResizeEvent && isNeedRacalculate)) {
    state.slider.findIdtoLoad(state.search.ids);
    if (document.querySelector('.pagination-wrap')) {
      sliderView.changeActiveLi(state.slider.nthLi);
    } else {
      sliderView.renderPadinbation(state.slider.page);
    }
    return true;
  }
  return false;
};
const swipeController = async (direction) => {
  sliderView.animate({
    duration: 200,
    timing: timeFraction => (
      timeFraction
    ),
    direction,
  });
  state.slider.changeNthLi(direction);
  await state.search.smoothLoading(state.slider.firstItemCount);
  state.slider.findIdtoLoad(state.search.ids);
  sliderView.changeActiveLi(state.slider.nthLi);
  sliderView.changePage(state.slider.page);
  clipsController(state.slider.idsToLoad, false, direction);
};
const showPage = (event) => {
  const target = event.target;
  if (target.matches('.pagination li , .pagination li *')) {
    let domElem;
    target.tagName === 'LI' ? domElem = target.firstChild : domElem = target;
    sliderView.animate({
      duration: 1500,
      timing: timeFraction => (
        timeFraction
      ),
      domElem,
    });
  }
};
document.addEventListener('DOMContentLoaded', () => {
  AnimationFrame();
  searchView.renderSearchForm();
  state.slider = new Slider();
  document.querySelector('.search-form').addEventListener('submit', (event) => {
    state.slider = new Slider();
    event.preventDefault();
    searchController();
  });
  window.addEventListener('resize', () => {
    if (document.querySelector('.content-wrapper')) {
      const isContinue = sliderController(true);
      if (isContinue) {
        clipsView.deleteClips();
        clipsController(state.slider.idsToLoad, false);
      }
    }
  });
  document.addEventListener('mousedown', (event) => {
    showPage(event);
    if (state.search) {
      const startX = event.clientX;
      state.swipe = new Swipe(startX);
    }
  });
  document.addEventListener('mouseup', (event) => {
    if (state.search && state.swipe) {
      const endX = event.clientX;
      state.swipe.putEndX(endX);
      const isListing = state.swipe.isNeedtoList(state.slider.page, state.slider.nthLi);
      if (isListing) {
        swipeController(state.swipe.direction);
      } else {
        sliderView.pullClipsWrap(0);
      }
      delete state.swipe;
    }
  });
  document.addEventListener('touchstart', (event) => {
    showPage(event);
    if (state.search) {
      const startX = event.changedTouches[0].screenX;
      state.swipe = new Swipe(startX);
    }
  }, false);
  document.addEventListener('touchend', (event) => {
    if (state.search && state.swipe) {
      const endX = event.changedTouches[0].screenX;
      state.swipe.putEndX(endX);
      const isListing = state.swipe.isNeedtoList(state.slider.page, state.slider.nthLi);
      if (isListing) {
        swipeController(state.swipe.direction);
      } else {
        sliderView.pullClipsWrap(0);
      }
    }
    delete state.swipe;
  }, false);
  document.addEventListener('mousemove', (event) => {
    if (state.swipe) {
      state.swipe.putEndX(event.clientX);
      const delta = state.swipe.calculateDeltaX();
      sliderView.pullClipsWrap(delta);
    }
  }, false);
  // проверить touch move
  document.addEventListener('touchmove', (event) => {
    if (state.swipe) {
      state.swipe.putEndX(event.changedTouches[0].screenX);
      const delta = state.swipe.calculateDeltaX();
      sliderView.pullClipsWrap(delta);
    }
  }, false);
});
