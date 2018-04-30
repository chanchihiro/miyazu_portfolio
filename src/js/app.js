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