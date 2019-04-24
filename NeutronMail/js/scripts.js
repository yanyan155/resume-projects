$(document).ready(function(){
  $('.slider-clients').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    dots: false,
    arrows: false,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
  });
  $('.slider-partners').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    dots: false,
    arrows: false,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }
  ]
  });
});