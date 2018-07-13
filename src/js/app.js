/* import file */
import * as THREE from 'three';
import Snap from 'snapsvg';
import * as fakeLoader from "fakeloader";

/* main */
$(function(){
  
  /*
  var allImage = $("img");
  var allImageCount = allImage.length;
  var completeImageCount = 0;

  for(var i = 0; i < allImageCount; i++){
    $(allImage[i]).bind("load", function(){
      completeImageCount ++;
      if (allImageCount == completeImageCount){
        // 処理
        alert('ready!');
        $("body").css("display","block");
      }
    });
  }
  */
  $(document).ready(function(){
    $("#fakeLoader").fakeLoader({
      timeToHide: 1200,
      zIndex: "999",
      spinner: "spinner1",
      bgColor: "#dcdcdc",
      //imagePath: ""
    });
  });


  //// svg animation
  let time = 1000;
  let timetext = 3000;
  let trigger = false;

  let tl = new TimelineLite({delay: 1.8}),
    firstBg = document.querySelectorAll('.text__first-bg'),
    secBg = document.querySelectorAll('.text__second-bg'),
    word  = document.querySelectorAll('.text__word');
  	tl
	  .to(firstBg, 0.2, {scaleX:1})
	  .to(secBg, 0.2, {scaleX:1})
	  .to(word, 0.1, {opacity:1}, "-=0.1")
	  .to(firstBg, 0.2, {scaleX:0})
	  .to(secBg, 0.2, {scaleX:0});
	trigger = true;

  let duration = 200,
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
  	$('#miyazu-modal-news').removeClass('is-selected');
  });

  // menu
  $('.miyazu-nav-hamburger').on('click',function(){
  	// $('#miyazu-nav').toggleClass('dn');
  	// $('#miyazu-sns').toggleClass('dn');
  	$('.line1').toggleClass('op1');
  	$('.line2').toggleClass('op');
  	$('.line3').toggleClass('op3');
  	$('#miyazu-nav').toggleClass('selected');
  	if($('#miyazu-nav').hasClass('selected')){
  		$('#miyazu-nav').fadeIn(100);
  	}else {
  		$('#miyazu-nav').fadeOut(100);
  	}
  });

  // 文字が出る
  $(".miyazu-banner").addClass('is-selected');
  $(".miyazu-banner2").addClass('is-selected');
  $(".miyazu-slides").addClass('is-selected');
  $(".title_logo").addClass('is-selected');
  $("#miyazu-modal-news").addClass('is-selected');
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

/*
const MathUtil = {
	TAU: Math.PI * 2,
};

class RandomNumberGenerator {
	static get a() {
		return 2147483647;
	}

	static get b() {
		return 16807;
	}

	constructor(seed = Math.floor(RandomNumberGenerator.a * Math.random())) {
		this.setSeed(seed);
	}

	setSeed(seed) {
		this.seed = (seed + RandomNumberGenerator.a) % RandomNumberGenerator.a;
	}

	next() {
		this.seed = (this.seed * RandomNumberGenerator.b) % RandomNumberGenerator.a;

		return this.seed;
	}

	nextFloat() {
		return this.next() / RandomNumberGenerator.a;
	}
}

class BallController {
	static get BALL_MOVEMENT_CYCLE_DURATION() {
		return 32;
	}

	static get BALL_MOVEMENT_RADIUS() {
		return 16;
	}

	constructor(ball) {
		const generator = new RandomNumberGenerator();

		this.ball = ball;
		this.frequency = BallController.getRandomVector(generator);
		this.phase = BallController.getRandomVector(generator).multiplyScalar(MathUtil.TAU);
	}

	update(time) {
		const angle = time * MathUtil.TAU / BallController.BALL_MOVEMENT_CYCLE_DURATION;

		this.ball.set(
			Math.sin(angle * this.frequency.x + this.phase.x) * BallController.BALL_MOVEMENT_RADIUS,
			Math.sin(angle * this.frequency.y + this.phase.y) * BallController.BALL_MOVEMENT_RADIUS,
			0
			// Math.sin(angle * this.frequency.z + this.phase.z) * BallController.BALL_MOVEMENT_RADIUS
		);
	}

	static getRandomVector(generator) {
		return new THREE.Vector3(
			generator.nextFloat(),
			generator.nextFloat(),
			generator.nextFloat()
		);
	}
};

const createMetaballShader = (ballCount) => {
	const uniformBalls = [];
	const uniforms = {
		balls: {
			type: 'v3v',
			value: new Array(ballCount),
		},
		diffuse: { value: null },
		radius: { value: 0 },
		threshold: { value: 1 },
	};

	return {
		uniforms,
		fragmentShader: fragmentShader.replace(/{ballCount}/g, ballCount),
		vertexShader,
	};
};

class Simulation {
	static get ballRadius() {
		return 1;
	}

	constructor(ballCount, color) {
		this.color = color;

		this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1024);
		this.camera.position.z = 64;

		this.renderer = Simulation.createRenderer();
		this.scene = new THREE.Scene();

		this.composer = new THREE.EffectComposer(this.renderer);
		this.ballControllers = new Array(ballCount).fill();
		this.metaballPass = null;

		if (this.renderer.capabilities.maxFragmentUniforms > this.ballControllers) {
			throw new Error(`Amount of balls can't be more than ${this.renderer.capabilities.maxFragmentUniforms}.`);
		}
	}

	async initialize() {
		this.initializeComposer();
		this.initializeScene();
	}

	initializeComposer() {
		const metaballShader = createMetaballShader(this.ballControllers.length);
		const renderPass = new THREE.RenderPass(this.scene, this.camera);

		this.metaballPass = new THREE.ShaderPass(metaballShader);
		this.metaballPass.material.transparent = true;
		this.metaballPass.uniforms.diffuse.value = this.color;
		this.metaballPass.uniforms.threshold.value = 0.75;
		this.metaballPass.renderToScreen = true;

		this.composer.addPass(renderPass);
		this.composer.addPass(this.metaballPass);
	}

	initializeScene() {
		this.ballControllers = this.ballControllers.map((_, i) => {
			const ballController = new BallController(new THREE.Vector3());

			this.ballControllers.push(ballController);

			return ballController;
		});
	}

	setSize(size) {
		this.camera.aspect = 1;
		this.camera.updateProjectionMatrix();

		this.composer.setSize(size, size);
		this.renderer.setSize(size, size);
	}

	render(time) {
		const ballUvs = this.metaballPass.uniforms.balls.value;

		this.metaballPass.uniforms.radius.value = new THREE.Vector3(Simulation.ballRadius, 0, 0).project(this.camera).x;

		this.ballControllers.forEach((controller, index) => {
			controller.update(time);

			ballUvs[index] = controller.ball.clone().project(this.camera);
		});

		this.composer.render();
	}

	static createRenderer() {
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});

		renderer.setPixelRatio(window.devicePixelRatio);

		return renderer;
	}
}

const animate = (fn) => {
	const update = (time) => {
		requestAnimationFrame(update);
		fn(time / 1000);
	};

	update(performance.now());
};

const color = new THREE.Color(0xd6ff5f);
const simulation = new Simulation(32, color);

simulation.setSize(Math.min(window.innerWidth, window.innerHeight));
simulation.initialize();

window.addEventListener('resize', () => {
	simulation.setSize(Math.min(window.innerWidth, window.innerHeight));
});

document.getElementById('stage').appendChild(simulation.renderer.domElement);

animate(time => simulation.render(time));
*/

});