let fixCoordX;
$(document).ready(function(){
  $('.comments-wrap').on('init', (event, slick) => {
    changeDotsCoord();
  });
  $('.comments-wrap').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  $('.comments-wrap').on('afterChange', (event, slick, currentSlide) => {
    changeDotsCoord();
  });



  function changeDotsCoord() {

    let slide = document.querySelector('.slick-active');
    let author = document.querySelector('.slick-active .pagination p');
    let dotsList = document.querySelector('.slick-dots');
    let sliderWrap = document.querySelector('.comments-wrap');
    let authorRect = author.getBoundingClientRect();
    let dotsListRect = dotsList.getBoundingClientRect();
    let sliderWrapRect = sliderWrap.getBoundingClientRect();

    if(slide.classList.contains("comment-1") && !fixCoordX) {
      fixCoordX = `${Math.round(authorRect.right + 10)}px`;
    }
    dotsList.style.top = `${Math.round(authorRect.top - sliderWrapRect.top + 3)}px`;
    if(slide.classList.contains("comment-1")) {
      dotsList.style.left = fixCoordX;
    } else {
      dotsList.style.left = `${Math.round(authorRect.right + 10)}px`;
    }
  }
});