/* import file */

/* main */
$(document).ready(function(){
  // slick.js
  $('.miyazu-slides').slick({
  	autoplay: true,
  	draggable: true,
  	infinite: true,
  	centerMode: true,
  	prevArrow: '<button class="slide-arrow prev-arrow"></button>',
  	nextArrow: '<button class="slide-arrow next-arrow"></button>',
  });

  // banners
  $('#miyazu-modal-button_close').on('click',function(){
  	$('#miyazu-modal-news').css('display','none');
  });
});