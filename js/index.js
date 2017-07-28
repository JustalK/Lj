// I don't use JQUERY because I want to keep the website with the less ressource possible
// Vanila JS - SCRIPT'S LATSUJ

// I add a class when we scroll for remove the hover element - optimization 60fps scroll
// I use classList.add instead of += " " because this is faster - jsperf
// I have created a lot of variables for saving the length of table because...it's faster so better :) 
// I use sometime the shift operator instead of arithmetic operator because it's faster when you have to turn the float value into an integer and multiply or divide it

// ================================================================================
// MY SCRIPT
// ================================================================================

// Once the document is ready...
document.addEventListener("DOMContentLoaded", function() {

	// ================================================================================
	// WebAssembly - I have created two functions in C99 for making the user experience smooth
	// ================================================================================
	var wasmCode = new Uint8Array([ 0, 97, 115, 109, 1, 0, 0,
			0, 1, 148, 128, 128, 128, 0, 2, 96, 5, 125, 125,
			125, 125, 125, 1, 125, 96, 6, 125, 125, 125, 125,
			125, 125, 1, 125, 3, 131, 128, 128, 128, 0, 2, 0,
			1, 4, 132, 128, 128, 128, 0, 1, 112, 0, 0, 5, 131,
			128, 128, 128, 0, 1, 0, 1, 6, 129, 128, 128, 128,
			0, 0, 7, 171, 128, 128, 128, 0, 3, 6, 109, 101,
			109, 111, 114, 121, 2, 0, 10, 119, 97, 115, 109,
			115, 99, 114, 111, 108, 108, 0, 0, 17, 119, 97,
			115, 109, 115, 99, 114, 111, 108, 108, 114, 101,
			118, 101, 114, 115, 101, 0, 1, 10, 222, 128, 128,
			128, 0, 2, 168, 128, 128, 128, 0, 0, 32, 1, 32, 3,
			32, 4, 147, 32, 2, 148, 34, 2, 32, 2, 32, 1, 95,
			27, 32, 0, 32, 2, 32, 0, 93, 32, 2, 32, 2, 92, 32,
			0, 32, 0, 92, 114, 114, 27, 11, 171, 128, 128, 128,
			0, 0, 32, 2, 32, 0, 32, 4, 32, 5, 147, 32, 3, 148,
			147, 34, 0, 32, 0, 32, 2, 95, 27, 32, 1, 32, 0, 32,
			1, 93, 32, 0, 32, 0, 92, 32, 1, 32, 1, 92, 114,
			114, 27, 11 ]);
	var m = new WebAssembly.Instance(new WebAssembly.Module(wasmCode));
	// Since I'm gonna use this function really often (I use it everytime I scroll)
	// I have made it with webAssembly for a very fast js - wasmScroll(max,min,velocity,a,offset)
	let wasmScroll = m.exports.wasmscroll;
	let wasmScrollReverse = m.exports.wasmscrollreverse;
	
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
		document.body.classList.add("show-orbitron");
		document.fonts.add(fontmonserratlight);
		document.fonts.add(fonttekolight);
		// As soon as the font are loaded, we made them appear on the website
		fontmonserratlight.loaded.then(function() {
			document.body.classList.add("show-montserratlight");
		});
		fonttekolight.loaded.then(function() {
			document.body.classList.add("show-tekolight");
			loadHighQualityImagesFirst();
		});
	});	
	
	// Load the fonts that we dont need for the first paint of the browser
	function loadAllTheOtherFont() {
    	// we finally load all the font, we need...
    	document.fonts.add(fonttekobold);
    	document.fonts.add(fontmontserratbold);
    	document.fonts.add(fonttekomedium);
    	
    	fonttekobold.loaded.then(function() {
			document.body.classList.add("show-tekobold");
		});
    	fontmontserratbold.loaded.then(function() {
			document.body.classList.add("show-montserratbold");
		});
    	fonttekomedium.loaded.then(function() {
			document.body.classList.add("show-tekomedium");
		});	
    	
    	// On all the previous fonts requested has been loaded
    	document.fonts.ready.then(function() {
			loadHighQualityImages();
    	});
	}
	
	// Load only the first time we scroll or if the scroll has already been move the global css file
	window.addEventListener('scroll', loadTheGlobalCss);
	function loadTheGlobalCss() {
		// For avoiding this function to be executed two time, we first remove the event
		window.removeEventListener('scroll', loadTheGlobalCss);
		// Then we load all the font, we need under the first screen
    	loadAllTheOtherFont();
    	
    	// And we load the css file
    	var file = "../Lj/css/global.css";
    	var link = document.createElement( "link" );
    	link.href = file.substr( 0, file.lastIndexOf( "." ) ) + ".css";
    	link.type = "text/css";
    	link.rel = "stylesheet";
    	link.media = "screen,print";
    	
    	document.getElementsByTagName( "head" )[0].appendChild( link );
	}
	
	// ================================================================================
	// For the image - LQPI Technique from Facebook
	// ================================================================================
	
	// Function for loading the first image in HD - Juste for a better effect
	function loadHighQualityImagesFirst() {
		var background = document.getElementById("FRAME1");
		var tmp = new Image();
		tmp.src = background.getAttribute("data-src");
		tmp.addEventListener('load',function() {
			// For a better maintainability, we gonna just add a class and make the all animation on the css
			this.classList.add("active");
		}.bind(background));
	}
	
	// Function for loading the images HQ after all the page has been loaded
	function loadHighQualityImages() {
		// First, we got the all frame
		var background = document.getElementsByClassName("frame");
		var backgroundlength = background.length; 
		// The first element is load with the other function
		// @see loadHighQualityImagesFirst()
		var backgroundHQ = [""];
		// For each frame, we gonna create an object Image fro perloading all the image and add an event on them
		for(var i=1; i < backgroundlength ; i++) {
			backgroundHQ.push(new Image());
			backgroundHQ[i].src = background[i].getAttribute("data-src");
			backgroundHQ[i].addEventListener('load',function() {
				// For a better maintainability, we gonna just add a class and make the all animation on the css
				background[this].classList.add("active");
			}.bind(i));
		}
	}

	// ================================================================================
	// For the different calcul - Calcul all the important value;
	// ================================================================================
	var a, wh, mwh, b, c, segment, numberframe, hf;
	
	// Initialize all the important variable
	function initialization() {
		// Current position of the user
		a = document.body.scrollTop;
		// Height of the browser's windows of the user
		wh = window.innerHeight;
		mwh = wh>>1;
		// Height of the website
		bh = document.body.clientHeight;
		b = bh - wh;
		c = a / b;
		// Height of a frame
		hf = 2*wh;
		// Position in a frame
		segment = a%hf;
		// Number of Frame
		numberframe = 1;
	}
	
	// ================================================================================
	// For the second step of scrolling - 
	// If the user scroll, I'm gonna load what he needs
	// Because he need more information that what he got at the start
	// ================================================================================	
	
	// For the little tricky effet for showing when your are
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
	var blocsinsideinformationstitle = document.getElementsByClassName("blocs-inside-informations-title");
	
	window.addEventListener('scroll', function() {
		// Initialisation of 
		initialization();
		
        // For the little tricky effect - Moving the width of the bar when we scroll
    	position.style.width=c*100+"%";

    	for(var i=0,maxvalue=30,minvalue=10,velocity=0.1,offset=wh-mwh; i < numberframe ; i++) {
    		blocsinsideinformationstitle[i].style.marginLeft = wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"px";
    	}    	
    	
    	for(var i=0,maxvalue=0.5,minvalue=0,velocity=0.001,offset=mwh; i < numberframe ; i++) {
    		blackout[i].style.opacity = wasmScroll(maxvalue,minvalue,velocity,a,offset);
    	}
    	
    	for(var i=0,maxvalue=mwh,minvalue=80,velocity=0.4,offset=0; i < numberframe ; i++) {
    		bigtitle[i].style.top = wasmScroll(maxvalue,minvalue,velocity,a,offset)+"px";
    	}
    	
    	for(var i=0,maxvalue=0.55,minvalue=0,velocity=0.0006,offset=0; i < numberframe ; i++) {
    		bigtitle[i].style.opacity = wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset);
    	}
    	
    	for(var i=0,maxvalue=20,minvalue=10,velocity=0.01,offset=wh; i < numberframe ; i++) {
    		areatextetitle[i].style.marginLeft = wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"%";
    	}

    	for(var i=0,maxvalue=45,minvalue=40,velocity=-0.005,offset=hf; i < numberframe ; i++) {
    		areatextesubtitle[i].style.marginLeft = wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"%";
    	}
    		
    	for(var i=0,maxvalue=162,minvalue=100,velocity=0.25,offset=mwh+100; i < numberframe ; i++) {
    		photo[i].style.height = "calc(100% - "+wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"px)";
    		photo[i].style.width = "calc(100% - "+wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"px)";
    	}
    	
    	// There are the same number of vertical and horizontal line
    	// A simple calcul based of  minvalue > ax + b > maxvalue (WebAssembly) - cause it's a reverse
    	for(var i=0,maxvalue=50,minvalue=0,velocity=0.3,offset=mwh-200; i < numberframe*2 ; i++) {
    		photolinehorizontal[i].style.left = wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"%"; 
    		photolinevertical[i].style.top = wasmScrollReverse(maxvalue,maxvalue,minvalue,velocity,a,offset)+"%"; 
    	}   	

    	for(var i=0,maxvalue=100,minvalue=0,velocity=0.6,offset=mwh-200; i < numberframe*2 ; i++) {
    		// A simple calcul based of  minvalue < ax + b < maxvalue (WebAssembly)
			photolinehorizontal[i].style.width = wasmScroll(maxvalue,minvalue,velocity,a,offset) + "%";
    		photolinevertical[i].style.height = wasmScroll(maxvalue,minvalue,velocity,a,offset) + "%";
    	}    	
    	
    	for(var i=0,maxvalue=30,minvalue=0,velocity=0.12,offset=mwh+100; i < numberframe*2 ; i++) {
			// A simple calcul based of  minvalue < ax + b < maxvalue (WebAssembly)
			photoblockvertical[i].style.width = wasmScroll(maxvalue,minvalue,velocity,a,offset)+"px";
			photoblockhorizontal[i].style.height = wasmScroll(maxvalue,minvalue,velocity,a,offset)+"px";
    	}
    	
    	isNewFrame();
    	
    	// When the user stop scrolling - we add an action of this
    	if(timer!==null) {
    		clearTimeout(timer);
    	}
		document.body.classList.remove("no-scrolling");
        timer = setTimeout(stopScrolling, 300);
	});
	
	// Add a class when we approach a new frame
	function isNewFrame() {
    	if(segment - mwh > 0) {
    		document.body.classList.add("new-frame");
    	} else {
    		document.body.classList.remove("new-frame");
    	}		
	}
	
	// I use this class for keeping the framerate to 60fps when the user scroll
	function stopScrolling() {
		document.body.classList.add("no-scrolling");
	}
	
	// ================================================================================
	// For the explications
	// ================================================================================	
	
	var buttonrightinformation = document.getElementsByClassName("blocs-inside-informations-right-page");
	var buttonleftinformation = document.getElementsByClassName("blocs-inside-informations-left-page");
	var wrapinformation = document.getElementsByClassName("blocs-inside-wrap");
	var wrapinformationlength = wrapinformation.length;
	var click = 0;
	
	/**
	 * Add a class for all the wrap of informations
	 * this class is use for choosing the movement of the text (left or right)
	 */
	function addClassWrapInformation(nameClass) {
		for(var j=0; j < wrapinformationlength ; j++) {
			wrapinformation[j].classList.add(nameClass);
		}		
	}
	
	/**
	 * Remove a class for all the wrap of informations
	 * this class is use for choosing the movement of the text (left or right)
	 */
	function removeClassWrapInformation(nameClass) {
		for(var j=0; j < wrapinformationlength ; j++) {
			wrapinformation[j].classList.remove(nameClass);
			wrapinformation[j].classList.remove("clicked");
		}		
	}
	
	function clickOnceWrapInformation() {
		for(var j=0; j < wrapinformationlength ; j++) {
			wrapinformation[j].classList.add("clicked");
		}				
	}
	
	function clickWrapInformation(nameClass) {
		// I update the cursor
		if(nameClass=="right-click") {
			click = Math.min(wrapinformationlength>>1,click+1);
		} else {
			click = Math.max(0,click-1);
		}
		
		for(var j=0; j < wrapinformationlength ; j++) {	
			if(j==click) { 			
				wrapinformation[j].classList.remove("right-click");
				wrapinformation[j].classList.remove("left-click");
			} else if(j>=click) {				
				wrapinformation[j].classList.remove("right-click");
				wrapinformation[j].classList.add("left-click");
			} else {
				wrapinformation[j].classList.add(nameClass);
			}
		}		
	}
	
	// Then I'm adding the event for the differents button in the website
	for(var i=0,count = buttonrightinformation.length; i < count ; i++) {
		buttonrightinformation[i].addEventListener("mouseenter",function() { addClassWrapInformation("right-hover")});
		buttonrightinformation[i].addEventListener("mouseout",function() { removeClassWrapInformation("right-hover")});
		buttonrightinformation[i].addEventListener("click",function() {clickWrapInformation("right-click")});
		buttonrightinformation[i].addEventListener("click",clickOnceWrapInformation);
		buttonleftinformation[i].addEventListener("mouseenter",function() {addClassWrapInformation("left-hover")});
		buttonleftinformation[i].addEventListener("mouseout",function() {removeClassWrapInformation("left-hover")});
		buttonleftinformation[i].addEventListener("click",function() {clickWrapInformation("left-click")});
		buttonleftinformation[i].addEventListener("click",clickOnceWrapInformation);
	}
	
	// ================================================================================
	// For the menu
	// ================================================================================	
	
	var menu = document.getElementsByClassName("menu");
	var menushow = document.getElementsByClassName("menu-show");
	var menushowlength = menushow.length;
	
	// For all the elements for showing the menu
	for(var i = 0,count = menu.length; i < count; i++) {
	    // I add an event when the user is clicking the element
	    menu[i].onclick = function() {
	    	// Then I show all the menu...(there are the exact same number of menu and menushow)
	    	for(var j = 0; j < menushowlength; j++) {
		        menushow[j].classList.add("active");
			    menu[j].classList.add("active");
	    	}
	        return false;
	    };
	}

});