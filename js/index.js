// Vanila JS - SCRIPT'S LATSUJ

// ================================================================================
// FUNCTIONS VERY VERY USEFULL - THANK TO PLAINJS
// ================================================================================

// select a list of matching elements, context is optional
function $(selector, context) {
    return (context || document).querySelectorAll(selector);
}

// select the first match only, context is optional
function $1(selector, context) {
    return (context || document).querySelector(selector);
}

// ================================================================================
// MY SCRIPT
// ================================================================================

// Once the document is ready...
document.addEventListener("DOMContentLoaded", function() {

	// ================================================================================
	// For the font - FOUT escape - Font Optimization by FontForge for removing the useless glyph
	// ================================================================================
	
	// The font that I want load first
	var fontorbitron = new FontFace("Orbitron", "url(./../Lj/fonts/orbitron-black-webfont.ttf)");
	
	// The others fonts that I have to load after the first one has been loaded (there are on the first screen)
	var fontmonserratlight = new FontFace("Montserrat Light", "url(./../Lj/fonts/montserrat-light-webfont.ttf)");
	var fonttekolight = new FontFace("Teko Light", "url(./../Lj/fonts/teko-light-webfont.ttf)");
	
	// And finally the fonts that can be loaded after that the first screen has been loaded
	var fonttekobold = new FontFace("Teko Bold", "url(./../Lj/fonts/teko-bold-webfont.ttf)");
	var fontmontserratbold = new FontFace("Montserrat Bold", "url(./../Lj/fonts/montserrat-bold-webfont.ttf)");
	var fonttekomedium = new FontFace("Teko Medium", "url(./../Lj/fonts/teko-medium-webfont.ttf)");
	
	// Then we load the first font !
	document.fonts.add(fontorbitron);
	fontorbitron.loaded.then(function() {
		// When the font is load, we make her appear on the website and we load the others...
		document.body.className += " show-orbitron";
		document.fonts.add(fontmonserratlight);
		document.fonts.add(fonttekolight);
		// As soon as the font are loaded, we made them appear on the website
		fontmonserratlight.loaded.then(function() {
			document.body.className += " show-montserratlight";
		});
		fonttekolight.loaded.then(function() {
			document.body.className += " show-tekolight";
			loadHighQualityImagesFirst();
		});
	});	
	
	function loadAllTheOtherFont() {
    	// we finally load all the font, we need...
    	document.fonts.add(fonttekobold);
    	document.fonts.add(fontmontserratbold);
    	document.fonts.add(fonttekomedium);
    	
    	fonttekobold.loaded.then(function() {
			document.body.className += " show-tekobold";
		});
    	fontmontserratbold.loaded.then(function() {
			document.body.className += " show-montserratbold";
		});
    	fonttekomedium.loaded.then(function() {
			document.body.className += " show-tekomedium";
			
			// Mb it's not gonna be the last font loaded but it's not very important
			// Because the browser gonna load the three fonts at the same time
			// I have just to keep in mind that the three font has to be loaded before the img
			loadHighQualityImages();
		});		
	}
	
	// ================================================================================
	// For the image - LQPI Technique from Facebook
	// ================================================================================
	
	function loadHighQualityImagesFirst() {
		var background = document.getElementById("FRAME1");
		var tmp = new Image();
		tmp.src = background.getAttribute("data-src");
		tmp.addEventListener('load',function() {
			// For a better maintainability, we gonna just add a class and make the all animation on the css
			this.className += " active";
		}.bind(background));
	}
	
	// Function for loading the images HQ after all the page has been loaded
	function loadHighQualityImages() {
		// First, we got the all frame
		var background = document.getElementsByClassName("frame");
		// The first element is load with the other function
		// @see loadHighQualityImagesFirst()
		var backgroundHQ = [""];
		// For each frame, we gonna create an object Image fro perloading all the image and add an event on them
		for(var i=1; i < background.length ; i++) {
			backgroundHQ.push(new Image());
			backgroundHQ[i].src = background[i].getAttribute("data-src");
			backgroundHQ[i].addEventListener('load',function() {
				// For a better maintainability, we gonna just add a class and make the all animation on the css
				background[this].className += " active";
			}.bind(i));
		}
	}
	
	// ================================================================================
	// For the second step of scrolling - 
	// If the user scroll, I'm gonna load what he needs
	// Because he need more information that what he got at the start
	// ================================================================================	
	var beginScroll = false;
	// For the little tricky effet for showing when your are
	var a = document.body.scrollTop;
	var wh = window.innerHeight;
	var b = document.body.clientHeight - wh;
	var c = a / b;
	var position = document.getElementById("POSITION");
	var timer;
	var blackout = document.getElementsByClassName("blackout-effect");
	var bigtitle = document.getElementsByClassName("big-title");
	var areatextetitle = document.getElementsByClassName("area-texte-title");
	var areatextesubtitle = document.getElementsByClassName("area-texte-subtitle");
	var photo = document.getElementsByClassName("photo");
	var photolinevertical = document.getElementsByClassName("photo-line-vertical");
	var photolinehorizontal = document.getElementsByClassName("photo-line-horizontal");
	var photoblockvertical = document.getElementsByClassName("photo-block-vertical");
	var photoblockhorizontal = document.getElementsByClassName("photo-block-horizontal");
	window.addEventListener('scroll', function() {
		// If the user have done at least one scroll
        if(!beginScroll) {
        	beginScroll=true;
        	loadAllTheOtherFont();
        	
        	var file = "../Lj/css/global.css";
        	
        	var link = document.createElement( "link" );
        	link.href = file.substr( 0, file.lastIndexOf( "." ) ) + ".css";
        	link.type = "text/css";
        	link.rel = "stylesheet";
        	link.media = "screen,print";
        	
        	document.getElementsByTagName( "head" )[0].appendChild( link );
        }
        
        // For the little tricky effect - Moving the width of the bar when we scroll
    	a = document.body.scrollTop;
    	wh = window.innerHeight;
    	b = document.body.clientHeight - window.innerHeight;
    	c = a / b;
    	position.style.width=c*100+"%";
    	
    	// For all the blackout-effect...
    	for(var i=0; i < blackout.length ; i++) {
    		// I calculate the position for rendering a white screen when you scroll down at each project
    		blackout[i].style.opacity = a/wh-2*i-0.5;
    	}
    	
    	// For all the title...
    	for(var i=0; i < bigtitle.length ; i++) {
    		// Maths, maths, maths....So it's just mean that I'm gonna move the title only when I pass throught them and the minimum top is 80px
    		bigtitle[i].style.top = Math.max((80 + 80*4*(a/wh-2*i)),80)+"px";
    		// So this one is for the opacity effect
    		// I have use the cosinus function for create a square function (1.570... is the value for 90 deg in radian)
    		bigtitle[i].style.opacity = Math.abs(0.55*Math.cos(1.5707963268*a/wh));
    	}
    	
    	// For all the description under the photo 
    	for(var i=0; i < areatextetitle.length ; i++) {
    		areatextetitle[i].style.marginLeft = 20-(Math.max(0,10*(a/wh-1)))+"%";
    		areatextesubtitle[i].style.marginLeft = 40+(Math.max(0,5*(a/wh-1)))+"%";
    	}
    	
    	for(var i=0; i < photo.length ; i++) {
    		console.log(Math.max(0,(a/wh)-0.3));
    		photo[i].style.height = "calc(100% - "+Math.max(100,162-400*Math.max(0,((a-wh/6)/wh)-0.4))+"px)";
    		photo[i].style.width = "calc(100% - "+Math.max(100,162-400*Math.max(0,((a-wh/6)/wh)-0.4))+"px)";
    	}
    	
    	for(var i=0; i < photolinevertical.length ; i++) {
    		photolinevertical[i].style.height = Math.min(100,100*((a+wh/2)/wh))+"%"; 
    		photolinevertical[i].style.top = Math.max(0,(50-50*(a+wh/2)/wh))+"%"; 
    	}
    	
    	for(var i=0; i < photolinehorizontal.length ; i++) {
    		photolinehorizontal[i].style.width = Math.min(100,100*((a+wh/2)/wh))+"%"; 
    		photolinehorizontal[i].style.left = Math.max(0,(50-50*(a+wh/2)/wh))+"%"; 
    	}    	
    	
    	console.log((2*a-wh-200)/wh);
    	for(var i=0; i < photoblockvertical.length ; i++) {
    		photoblockvertical[i].style.width = Math.min(30,Math.max(0,50*((2*a-wh-200)/wh)))+"px"; 
    		photoblockhorizontal[i].style.height = Math.min(30,Math.max(0,50*((2*a-wh-200)/wh)))+"px";
    	}
    	
    	// When we reach a new frame with informations, we add a class
    	if(a%(2*wh) - wh/2 > 0) {
    		document.body.classList.add("new-frame");
    	} else {
    		document.body.classList.remove("new-frame");
    	}
    	
    	// When the user stop scrolling - we add an action of this
    	if(timer!==null) {
    		clearTimeout(timer);
    	}
		document.body.classList.remove("no-scrolling");
        timer = setTimeout(stopScrolling, 300);
	});
	
	// I use this class for keeping the framerate to 60fps when the user scroll
	function stopScrolling() {
		document.body.className += " no-scrolling";
	}

	// ================================================================================
	// For the explications
	// ================================================================================	
	
	var buttonrightinformation = document.getElementsByClassName("blocs-inside-informations-right-page");
	var buttonleftinformation = document.getElementsByClassName("blocs-inside-informations-left-page");
	var wrapinformation = document.getElementsByClassName("blocs-inside-wrap");

	for(var i=0; i < buttonrightinformation.length ; i++) {
		buttonrightinformation[i].addEventListener("mouseenter",function() {
			for(var j=0; j < wrapinformation.length ; j++) {
				wrapinformation[j].classList.add("right-hover");
			}
		});
		buttonrightinformation[i].addEventListener("mouseout",function() {
			for(var j=0; j < wrapinformation.length ; j++) {
				wrapinformation[j].classList.remove("right-hover");
			}
		});
		buttonleftinformation[i].addEventListener("mouseenter",function() {
			console.log("azeae");
			for(var j=0; j < wrapinformation.length ; j++) {
				wrapinformation[j].classList.add("left-hover");
			}
		});
		buttonleftinformation[i].addEventListener("mouseout",function() {
			console.log("zzzz");
			for(var j=0; j < wrapinformation.length ; j++) {
				wrapinformation[j].classList.remove("left-hover");
			}
		});
	}
	
	
	// ================================================================================
	// For the menu
	// ================================================================================	
	
	var menu = document.getElementsByClassName("menu");
	var menushow = document.getElementsByClassName("menu-show");
	
	// For all the elements for showing the menu
	for(var i = 0; i < menu.length; i++) {
	    // I add an event when the user is clicking the element
	    menu[i].onclick = function() {
	    	// Then I show all the menu...(there are the exact same number of menu and menushow)
	    	for(var j = 0; j < menushow.length; j++) {
		        menushow[j].className += " active";
			    menu[j].className += " active";
	    	}
	        return false;
	    };
	}

});