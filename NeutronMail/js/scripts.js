$(document).ready(function(){
  // wow.js logic
  new WOW().init();
  //slick slider logic
  $('.slider-clients').slick({
    slidesToShow: 5,
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
  // quotesControl logic
  let blockquotesControl = document.querySelector('.quote-controls');
  blockquotesControl.addEventListener('click', (event) => {
    let target = event.target;
    if(target.dataset.quote 
       && !target.classList.contains('active') ) {

      let number = Number(target.dataset.quote);
      let allLi = blockquotesControl.querySelectorAll("li");
      delSetActiveClass(allLi, number);
      
      let allquotes = document.querySelectorAll(".quotes-wrap .quote-block");
      delSetActiveClass(allquotes , number);
    }
  })
  function delSetActiveClass(elems, number) {
    let array = Array.from(elems);
    array.forEach((elem, i, arr) => {
      elem.classList.contains('active') ? elem.classList.remove("active") : '';
      number === i+1 ? elem.classList.add("active") : '';
    }); 
  }
  // hamburger logic
  let pointView = 1050;
  let isShowHamburger = false;
  window.addEventListener("resize", () => {
    //setTimeout(() => { 
      burderMenu();
    //}, 100);
  });

  const toogleClass = () => {

    let hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("is-active");
    let menu = document.querySelector("nav");
    menu.classList.toggle("show");
  }
  function burderMenu () {

    let innerWidth = window.innerWidth;
    if(innerWidth <= pointView && !isShowHamburger) {

      isShowHamburger = true;
      let hamburger = document.querySelector(".hamburger");
      hamburger.style.display = "inline-block";
      hamburger.addEventListener("click", toogleClass, true);

    } else if(innerWidth > pointView && isShowHamburger) {

      isShowHamburger = false;
      let hamburger = document.querySelector(".hamburger");
      hamburger.style.display = "none";
      hamburger.removeEventListener("click", toogleClass, true);
    }
  }
  // burdermenu logic
  burderMenu();
});