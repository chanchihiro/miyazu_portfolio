/* import file */
import * as THREE from 'three';

/* main */
$(document).ready(function(){
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