(function($){

	// Data Object (class)
	var Data = {
	
		// p for "parallax elements"
		p: new Array(), 
		
		// initialize
		init:function(){
			// loop through all the elements in #parallax-layers and put them in an array.
			$("#parallax-layers").children().each(function(){
				// put this element in our shortcut array
				Data.p.push( $(this) );
			});
		}
	};
	
	// grid system Obj (class)
	var Grid = {
	
		// center of the page x and y.
		cx:0, 
		cy:0, 
		
		// set the center point of our grid system
		setCenterPoint: function(){
			Grid.cx = $(window).width()/2;
			Grid.cy = $(window).height()/2;
		},
		
		// initialize
		init: function(){
			// set the grids zero point x & y to the middle of the page
			Grid.setCenterPoint();
		}	
	};
	
	// parallax obj (class)
	var Parallax = {
	
		// the mouse x & y position in the browser
		mx:0, 
		my:0, 
		
		// initialize
		init:function(){
			$(document).bind("mousemove", function(e){
				Parallax.mx = e.pageX;
				Parallax.my = e.pageY;
			});
		},
		
		// render/move
		step:function(){
			// align the elements to the center of the screen.
			var p = Data.p; // store a local variable reference for short writing
			var l = p.length; // how many elements do we have?
			var i = 0; // our iteration number
			// loop through all of the p elements
			for(i=0; i<l; i++){
				// put them on the center of the page
				var m = p[i]; // our element in the loop.
				// first, set the element to the center
				var x = Grid.cx - (m.width()/2);
				var y = Grid.cy - (m.height()/2);
				// split the data-offset-position into an array 
				var a = m.attr("data-offset-position").split(",");
				// now grab the offset offset-position from each element
				var xOff = Number(a[0]);
				var yOff = Number(a[1]);
				// apply the responsive ratio offset.
				x += xOff * Responsive.ratio;
				y += yOff * Responsive.ratio;
				// now, depending on the mouse difference from the center, do some parallaxing.
				var mox = Grid.cx - Parallax.mx; //mo = mouse offset
				var moy = Grid.cy - Parallax.my;
				// define the speed at which things move
				var speed = 3;
				// apply the mouse offset to the position
				x += (mox/((l-i)*speed));
				y += (moy/((l-i)*speed));
				// set the CSS.
				$(m).css({"margin-left": x+"px", "margin-top": y+"px"});
			}
		}
	};
	
	var Render = {
	
		// state of render engine
		state: "idle",
		
		// start
		start:function(){
			Render.state = "render";
			requestAnimationFrame(Render.step);
		},
		// step through the render
		step: function(){
			Parallax.step();
			if(Render.state=="render"){
				requestAnimationFrame(Render.step);
			}
		},
		// stop
		stop:function(){
			Render.state = "idle";
		}
	};
	
	
	var Responsive = {
	
		// dimentions of the PSD that was given.
		psdSize: new Array(1280,1024),
		
		// ratio of browser vs PSD
		ratio:0,
		
		// render the size of the app
		render: function(){
			// what's the ratio of our screen size?
			var ww = $(window).width();
			var wh = $(window).height();
			var w = (ww > wh) ? wh : ww;
			var ratio = w / Responsive.psdSize[1];
			ratio = ratio;
			
			Responsive.ratio = Math.max(ratio, 0.4);
			
			var p = Data.p; // store a local variable reference for short writing
			var l = p.length; // how many elements do we have?
			var i = 0; // our iteration number
			
			// loop through all of the p elements
			for(i=0; i<l; i++){
				// put them on the center of the page
				var m = p[i]; // our element in the loop.
				if( ! m.hasClass("noscale")){
					$(m).css({"-webkit-transform": 'scale('+Responsive.ratio+', '+Responsive.ratio+')'});	
				}
			}
		}
	};
	
	$(document).ready(function(){
		
		setTimeout(function(){
			$(window).resize(function(e){
				Grid.setCenterPoint();
				Parallax.step();
				Responsive.render();
			});
			//
			Data.init();
			Grid.init();
			$(".p-item").css("display","block");
			//
			Responsive.render();
			Parallax.init();
			Parallax.step();
			// start the rendering...
			Render.start();
			
		}, 100);
	});
	
}(jQuery));
