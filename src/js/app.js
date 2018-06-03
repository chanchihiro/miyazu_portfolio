/* import file */
import * as THREE from 'three';
import Snap from 'snapsvg';


/* main */
$(document).ready(function(){

  //// svg animation
  let time = 100;
  let timetext = 1400;
  let trigger = false;

  let tl = new TimelineLite({delay: 0.5}),
    firstBg = document.querySelectorAll('.text__first-bg'),
    secBg = document.querySelectorAll('.text__second-bg'),
    word  = document.querySelectorAll('.text__word');
  	tl
	  .to(firstBg, 0.2, {scaleX:1})
	  .to(word, 0.1, {opacity:1}, "-=0.1")
	  .to(firstBg, 0.2, {scaleX:0})
	trigger = true;

  let duration = 500,
    epsilon = (time / 60 / duration) / 4,
	firstCustomMinaAnimation = bezier(.42,.03,.77,.63, epsilon),
	secondCustomMinaAnimation = bezier(.27,.5,.6,.99, epsilon),
	animating = false;

  //initialize the slider
  $('.slider-wrapper').each(function(){
    initSlider($(this));
  });

  function initSlider(sliderWrapper) {
  	//cache jQuery objects
	var slider = sliderWrapper.find('.slider'),
		sliderNav = sliderWrapper.find('.slider-navigation'),
		sliderControls = sliderWrapper.find('.slider-controls').find('li');
	//store path 'd' attribute values	
	var pathArray = [];
	pathArray[0] = slider.data('step1');
	pathArray[1] = slider.data('step4');
	pathArray[2] = slider.data('step2');
	pathArray[3] = slider.data('step5');
	pathArray[4] = slider.data('step3');
	pathArray[5] = slider.data('step6');

	slider.on('swipeleft', function(event){
		if(trigger) {
			trigger = false;
			setTimeout(function() {
				prevSlide(slider, sliderControls, pathArray);
			},time);
	
			setTimeout(function() {
				tl.restart()
				trigger = true;
			},timetext);
		}	
	});
	slider.on('swiperight', function(event){
		if(trigger) {
			trigger = false;
			setTimeout(function() {
				nextSlide(slider, sliderControls, pathArray);
			},time);
	
			setTimeout(function() {
				tl.restart()
				trigger = true;
			},timetext);
		}		
	});
  }

  function bezier(x1, y1, x2, y2, epsilon){
    //https://github.com/arian/cubic-bezier
    var curveX = function(t){
			var v = 1 - t;
			return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
		};
		var curveY = function(t){
			var v = 1 - t;
			return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
		};
		var derivativeCurveX = function(t){
			var v = 1 - t;
			return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
		};
		return function(t){
			var x = t, t0, t1, t2, x2, d2, i;
			// First try a few iterations of Newton's method -- normally very fast.
			for (t2 = x, i = 0; i < 8; i++){
				x2 = curveX(t2) - x;
				if (Math.abs(x2) < epsilon) return curveY(t2);
				d2 = derivativeCurveX(t2);
				if (Math.abs(d2) < 1e-6) break;
				t2 = t2 - x2 / d2;
			}
			t0 = 0, t1 = 1, t2 = x;
			if (t2 < t0) return curveY(t0);
			if (t2 > t1) return curveY(t1);
			// Fallback to the bisection method for reliability.
			while (t0 < t1){
				x2 = curveX(t2);
				if (Math.abs(x2 - x) < epsilon) return curveY(t2);
				if (x > x2) t0 = t2;
				else t1 = t2;
				t2 = (t1 - t0) * .5 + t0;
			}
			// Failure
			return curveY(t2);
      };
  };


  //// slick.js
  $('.miyazu-slides').slick({
  	autoplay: true,
  	draggable: true,
  	infinite: true,
  	centerMode: true,
  	pauseOnHover: false,
  	speed: 340,
  	autoplaySpeed: 5000,
  	cssEase: 'ease-out',
  	slidesToShow: 1,
  	prevArrow: '<button class="slide-arrow prev-arrow"></button>',
  	nextArrow: '<button class="slide-arrow next-arrow"></button>',
  });

  //// banners
  $('#miyazu-modal-button_close').on('click',function(){
  	$('#miyazu-modal-news').css('display','none');
  });

  // menu
  $('.miyazu-nav-hamburger').on('click',function(){
  	console.log("こんちは");
  	// $('#miyazu-nav').toggleClass('dn');
  	// $('#miyazu-sns').toggleClass('dn');
  	$('.line1').toggleClass('op1');
  	$('.line2').toggleClass('op');
  	$('.line3').toggleClass('op3');
  	$('.menus').toggleClass('is-selected');
  	$(".snss").toggleClass('is-selected');
  	$("#miyazu-nav").toggleClass('is-selected');
  	if($("#miyazu-nav").hasClass('is-selected')){
  		$("#miyazu-nav").fadeIn(20);
  	}else {
  		$("#miyazu-nav").fadeOut(20);
  	}
  });

  // 文字が出る
  $(".miyazu-profile-name1").addClass('is-selected');
  $(".miyazu-profile-name2").addClass('is-selected');
  $("#miyazu-profole-english").addClass('is-selected');
  $("#miyazu-profole-japan").addClass('is-selected');
  $("#miyazu-profile-image").addClass('is-selected');
  $("#miyazu-paragraph-text").addClass('is-selected');
  $("#miyazu-paragraph-title").addClass('is-selected');
  $("#miyazu-works").addClass('is-selected');
  $("#miyazu-news-content1").addClass('is-selected');
  $("#miyazu-news-content2").addClass('is-selected');
  $("#miyazu-news-content3").addClass('is-selected');

  //// three.js
  let scene;
  let sphere;
  let camera;
  let renderer;
  let light;
  let width = 500;
  let height = 250;

  // scene ステージ
  scene = new THREE.Scene();
  // メッシュ
  sphere = new THREE.Mesh(
  	new THREE.SphereGeometry(100, 20, 20), // geometry 形状
  	new THREE.MeshLambertMaterial({color: 0x8dc3ff}) // material 材質、色
  );
  sphere.position.set(0, 0, 0);
  scene.add(sphere);
  // ライト
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 30);
  scene.add(light);
  // カメラ
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  camera.position.set(200, 100, 300);
  camera.lookAt(scene.position);
  // レンダラー
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(width, height);
  renderer.setClearColor(0xeeeeee);
  document.getElementById('stage').appendChild(renderer.domElement);
  renderer.render(scene, camera);
});