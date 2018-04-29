/* import file */

/* main */
$(document).ready(function(){
  // slick.js
  $('.miyazu-slides').slick({
  	autoplay: true,
  	draggable: true,
  	infinite: true,
  	centerMode: true,
  	prevArrow: '<img src="../images/arrow.png" class="slide-arrow prev-arrow">',
  	nextArrow: '<img src="../images/arrow2.png" class="slide-arrow next-arrow">'
  });

  $('#miyazu-modal-button_close').on('click',function(){
  	$('#miyazu-modal-news').css('display','none');
  });
});