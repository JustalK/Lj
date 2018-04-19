// I don't use JQUERY because I want to keep the website with the less ressource possible, so everything you see is made by me ;)
// The only libraries that I use here is three.js, I could have made everything without using this library but I dont wanna lose all my time on some 3D animation
// Vanila JS - SCRIPT'S LATSUJ

// I'm explaining here, some of my choices, what i have done...Feel free to contact me an email, if you have some question or some ways for improving my coding style : kevin.justal@gmail.com
//
// I've added a class when we scroll for remove the hover element - optimization 60fps scroll
// I have made my page HTML instead of PHP because the serveur dont have to render the page, so I'm winning few milliseconds - i could have used some software for prerendering the page but It add some useless complexity to my website. 
// I've added use classList.add instead of += " " because this is faster - jsperf
// I've created a lot of variables for saving the elements of the dom only one time 
// I use sometime the shift operator instead of arithmetic operator because it's faster when you have to turn the float value into an integer and multiply or divide it
// I've created 2 alias for the function document.getElementById and document.getElementsByClassName - save some byte this way
// I'm using the transform on z for usinf the GPU and not repainting the windows
// I'm using the WebAssembly for two functions because it's faster this ways after some profiling on my website
// I'm loading asynchronously the css and the font and the image - in this way the first impression of the page is fast - the faster the better
// I'm using some framerate control like you can find in a game loop for controlling the fps when the user scroll - In this way, I keep the 60fps despite the naimation when the user scroll
// Finally, every choices that I've made is tested with extreme profiling ;)

// ================================================================================
// MY SCRIPT
// ================================================================================
"use strict";

var fontorbitron = new FontFace("Orbitron", "url(./../fonts/orbitron-black-webfont.ttf)");
document.fonts.add(fontorbitron);

// Once the document is ready...
document.addEventListener("DOMContentLoaded", function() {
	// Alias for winning some extrabyte
	const $i = id => document.getElementById(id);
	const $n = cn => document.getElementsByClassName(cn);
	
	// My temporary variable for all the system
	var tmp,
	// ================================================================================
	// WebAssembly - I have created two functions in C99 for making the user experience smooth
	// ================================================================================
	wasmCode = new Uint8Array([ 0, 97, 115, 109, 1, 0, 0,
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
			114, 27, 11 ]),
	m = new WebAssembly.Instance(new WebAssembly.Module(wasmCode)),
	// Since I'm gonna use this function really often (I use it everytime I scroll)
	// I have made it with webAssembly for a very fast js - wasmScroll(max,min,velocity,a,offset)
	wasmScroll = m.exports.wasmscroll,
	wasmScrollReverse = m.exports.wasmscrollreverse,
	
	// ================================================================================
	// For the font - FOUT escape - Font Optimization by FontForge for removing the useless glyph
	// ================================================================================
	
	// The font that I want load first
	fontorbitronr = new FontFace("Orbitron Regular", "url(./../fonts/orbitron-regular-webfont.ttf)"),
	
	// The others fonts that I have to load after the first one has been loaded (there are on the first screen)
	fontmonserratlight = new FontFace("Montserrat Light", "url(./../fonts/montserrat-light-webfont.ttf)"),
	fonttekolight = new FontFace("Teko Light", "url(./../fonts/teko-light-webfont.ttf)"),
	
	// And finally the fonts that can be loaded after that the first screen has been loaded
	fonttekobold = new FontFace("Teko Bold", "url(./../fonts/teko-bold-webfont.ttf)"),
	fontmontserratbold = new FontFace("Montserrat Bold", "url(./../fonts/montserrat-bold-webfont.ttf)"),
	fonttekomedium = new FontFace("Teko Medium", "url(./../fonts/teko-medium-webfont.ttf)"),
	fontlatsuj = new FontFace("Latsuj", "url(./../fonts/latsuj.ttf)");

	// Then we load the first font !
	fontorbitron.loaded.then(function() {
		// When the font is load, we make her appear on the website and we load the others...
		document.body.classList.add("show-orbitron");
		document.fonts.add(fontmonserratlight);
		document.fonts.add(fonttekolight);
		document.fonts.add(fontlatsuj);
		// As soon as the font are loaded, we made them appear on the website
		fontmonserratlight.loaded.then(function() {
			document.body.classList.add("show-montserratlight");
		});
		
		fontlatsuj.loaded.then(function() {
			document.body.classList.add("show-latsuj");
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
	}
	
	// Load only the the global css file once everything for the first load as been load
	function loadTheGlobalCss() {
		// For avoiding this function to be executed two time, we first remove the event
		//window.removeEventListener('scroll', loadTheGlobalCss);
		// Then we load all the font, we need under the first screen
    	
    	// And we load the css file
    	addStyle("../css/global.css");
    	
    	// If the width of the client is under 1280px, we read the media queries file
    	bw<1280 && loadMediaQueries();
	}
	
	/**
	 * Adding a style to the head
	 * @param file The path of the file that i want to read
	 */
	function addStyle(file) {
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
		var background = $n("frame-first");
		tmp = new Image();
		// We just add a background for the second frame - the first one dont need it because of the three.js canvas
		tmp.src = background[1].getAttribute("data-src");
		tmp.addEventListener('load',function() {
			for(var i=this.length;i--;) {
				// For a better maintainability, we gonna just add a class and make the all animation on the css
				this[i].classList.add("active");
			}
		}.bind(background));
	}
	
	// Function for loading the images HQ after all the page has been loaded
	var frames = $n("frame"), frameslength = frames.length; 
	for(var i=frames.length;i--;) {
		frames[i].style.height = document.documentElement.clientHeight+"px";
	}
	function loadHighQualityImages() {
		// We are not on the first sreen anymore so we load the other font 
		loadAllTheOtherFont();
		loadTheGlobalCss();
		
		// If we reach the end of the website, there are nothing to load
		if(currentframe*2+2>=frames.length) {
			return false;
		}
		// If I'm in a last segment
		if(segment-wh>0) {
			loadingHighQualityImages = true;
			// The first element is load with the other function
			// @see loadHighQualityImagesFirst()
			var backgroundOnWait = [frames[currentframe*2+2],frames[currentframe*2+3]];
			var backgroundHQ = [new Image(),new Image()];
			// For each frame, we gonna create an object Image fro perloading all the image and add an event on them
			for(var i=2;i--;) {
				backgroundHQ[i].src = backgroundOnWait[i].getAttribute("data-src");
				backgroundHQ[i].addEventListener('load',function() {
					// For a better maintainability, we gonna just add a class and make the all animation on the css
					backgroundOnWait[this].classList.add("active");
				}.bind(i));
			}
		}
	}
	
	function loadLastPhoto() {
		if(currentframe>=2) {
			// We load the font for the last frame
			document.fonts.add(fontorbitronr);
			fontorbitronr.loaded.then(function() {
				document.body.classList.add("show-orbitronr");
			});
			// and we load the background just after
			loadingLastHighQualityImages = true;
			var background = $i("LASTFRAME");
			tmp = new Image();
			tmp.src = background.getAttribute("data-src");
			tmp.addEventListener('load',function() {
				// For a better maintainability, we gonna just add a class and make the all animation on the css
				this.classList.add("active");
			}.bind(background));
		}
	}
	
	// ================================================================================
	// For the different calcul - Calcul all the important value;
	// bh : Height of the document
	// wh : Height of the browser's windows of the user
	// ================================================================================
	var a, wh = window.innerHeight, mwh, b, c, segment, numberframe, currentframe, hf, bg, bh = document.documentElement.clientHeight, bw = document.documentElement.clientWidth;
	// Initialize all the important variable
	function initialization() {
		// Current position of the user
		a = lastScrollY;
		mwh = wh>>1;
		b = bh - wh;
		c = a / b;
		// Height of a frame
		hf = 2*wh;
		// Position in a frame
		segment = a%hf;
		// Number of Frame
		numberframe = 2;
		// Current frame - start by 0
		currentframe = a/hf>>0;
		// The background of photo for the frame
		bg = backgroundphoto[currentframe];
	}
	
	// ================================================================================
	// For the second step of scrolling - 
	// If the user scroll, I'm gonna load what he needs
	// Because he need more information that what he got at the start
	// ================================================================================	
	
	// For the little tricky effet for showing when your are
	var position = $i("POSITION"),
	timer,
	framerateScroll = 1000/60,
	notificationSend = false,
	loadingHighQualityImages = false,
	loadingLastHighQualityImages = false,
	blackout = $n("blackout-effect"),
	bigtitle = $n("big-title"),
	date = $n("date"),
	datelineup = $n("date-line-up"),
	datelinedown = $n("date-line-down"),
	areatexte = $n("area-texte"),
	areatextetitle = $n("area-texte-title"),
	areatextesubtitle = $n("area-texte-subtitle"),
	photo = $n("photo"),
	photowrap = $n("photo-wrap"),
	photolinevertical = $n("photo-line-vertical"),
	photolinehorizontal = $n("photo-line-horizontal"),
	photoblockvertical = $n("photo-block-vertical"),
	photoblockhorizontal = $n("photo-block-horizontal"),
	photosquare = $n("photo-square"),
	blocsinsideinformationstitle = $n("blocs-inside-informations-title"),
	backgroundphoto = $n("background-photo"),
	frameinformations = $n("frame-informations"),
	areas = $n("areas"),
	blocsinsidewrap = $n("blocs-inside-wrap"),
	refresh = true,
	lastScrollY = document.documentElement.scrollTop,
	endRefresh = false,
	calculChangeFrame;
	
	// For positionning the bigtitle precisely
	for(var i=bigtitle.length;i--;) {
		bigtitle[i].style.top = (i*hf)+"px";
	}
	// For initializing the variable
	initialization();
	
	/**
	 * Creating an event on the croll but setting a framerate for smoothing the animation on every computer
	 */
	window.addEventListener('scroll', function() {
		if (!refresh) return;
		clearTimeout(endRefresh);
		refresh = false;

		lastScrollY = document.documentElement.scrollTop;
		requestAnimationFrame(scroll);
		
        setTimeout(function () {
            refresh = true;
        }, framerateScroll);
        // If the last event is a waiting, we make an other call to scroll - In that way, we add more accuracy to the project
        endRefresh = setTimeout(function () {
        	requestAnimationFrame(scroll);
        }, 100);
	});
	
	/**
	 * The all actions done on one scroll
	 */
	function scroll() {
		// Initialisation of variables
		initialization();
    	
		animations();
		
		if(segment - mwh > 0) {
			// If I have not been in this loop for this frame
			if(bg.dataset.load!=1) {
				bg.dataset.load = 1;
				bg.style.backgroundImage = "url("+bg.dataset.imglow+")";
				// I create a new image for preload the content
				tmp = new Image();
				tmp.src = backgroundphoto[currentframe].dataset.img;
				tmp.addEventListener('load',function() {
					this.style.backgroundImage = "url("+this.dataset.img+")";
				}.bind(bg));
			}
    		document.body.classList.add("new-frame");
		}
		
    	hasToLockAnimation();
		
		// Load the image with LQIP technique at the right moment
		!loadingHighQualityImages && loadHighQualityImages();
		!loadingLastHighQualityImages && loadLastPhoto();
		
    	isNewFrame();
    	
    	// When the user stop scrolling - we add an action of this
    	timer!==null && clearTimeout(timer);
		document.body.classList.remove("no-scrolling");
        timer = setTimeout(stopScrolling, 300);
	}
	
	/**
	 * All the animation of movements when the user scroll
	 */
	function animations() {
    	// Play the animation only if we have not reach the footer yet
    	if(currentframe<frames.length/2) {
    		calculChangeFrame = wasmScroll(1,0,1,segment,mwh+100);
    		
	    	blocsinsideinformationstitle[currentframe].style.transform = "translateX("+wasmScrollReverse(30,30,10,0.1,segment,wh-mwh)+"px)";
	    	blackout[currentframe].style.opacity = wasmScroll(0.5,0,0.001,segment,mwh);
	    	
	    	bigtitle[currentframe].style.cssText = "opacity:"+wasmScrollReverse(0.55,0.55,0,0.0018,segment,100)+";transform:translateZ(0) translateY("+wasmScroll(mwh,80,0.8,segment,0)+"px)";
	    	
	    	areatextetitle[currentframe].style.transform = "translateX("+wasmScrollReverse(20,20,10,0.01,segment,wh)+"%)";
	    	
	    	date[currentframe].style.transform = "rotate(-90deg) translateX(-"+wasmScroll(285,100,0.25,segment,-wh/2)+"%)";
	    	datelineup[currentframe].style.transform = "scaleY("+calculChangeFrame+")";
	    	datelinedown[currentframe].style.transform = "scaleY("+calculChangeFrame+")";
	    	
	    	photo[currentframe].style.transform = "scale("+wasmScroll(1,0.912,1,segment,mwh+100)+","+wasmScroll(1,0.840,1,segment,mwh+100)+")";
	    	areatexte[currentframe].style.transform = "translate3d(0,"+wasmScroll(200,50,0.4,segment,mwh+200)+"px,0)";
	    	photowrap[currentframe].style.transform = "translateY("+wasmScroll(200,50,0.4,segment,mwh+200)+"px)";

	    	areas[currentframe*2].style.transform = "translate3d(0,-"+wasmScroll(200,0,50,segment,wh+200)+"px,0)";
	    	areas[currentframe*2+1].style.transform = "translate3d(0,-"+wasmScroll(200,0,50,segment,wh+200)+"px,0)";
	    	
	    	// Locking at 0.99 opacity for doing the job on the GPU and never painting this area a second time
	    	blocsinsidewrap[currentframe*2].style.opacity = wasmScroll(0.99,0,0.003,segment,mwh);
	    	blocsinsidewrap[currentframe*2+1].style.opacity = wasmScroll(0.99,0,0.003,segment,mwh);
	    	blocsinsidewrap[currentframe*2+2].style.opacity = wasmScroll(0.99,0,0.003,segment,mwh);
	    	
	    	// I'm using two element invisible for not repaiting the entire screen
	    	photolinehorizontal[currentframe*2].style.transform = "scaleX("+calculChangeFrame+")"; 
	    	photolinehorizontal[currentframe*2+1].style.transform = "scaleX("+calculChangeFrame+")"; 
	    	
	    	photolinevertical[currentframe*2].style.transform = "scaleY("+calculChangeFrame+")";
	    	photolinevertical[currentframe*2+1].style.transform = "scaleY("+calculChangeFrame+")";   	
	    	
			photoblockvertical[currentframe*2].style.transform = "scaleX("+calculChangeFrame+")";
			photoblockvertical[currentframe*2+1].style.transform = "scaleX("+calculChangeFrame+")";
			photoblockhorizontal[currentframe*2].style.transform = "scaleY("+calculChangeFrame+")";
			photoblockhorizontal[currentframe*2+1].style.transform = "scaleY("+calculChangeFrame+")";
	    	
			// TranslateZ and will-change for repaiting only the good area
			backgroundphoto[currentframe].style.transform = "scale("+wasmScrollReverse(1.5,1.5,1,0.002,segment,mwh)+","+wasmScrollReverse(1.5,1.5,1,0.002,segment,mwh)+") translateZ(0) rotateZ("+wasmScrollReverse(30,30,0,0.06,segment,mwh-200)+"deg)";
			
			for(var i=4;i--;) {
				photosquare[currentframe*4+i].style.transform = "scale("+wasmScroll(1,0,1,segment,mwh+100)+","+wasmScroll(1,0,1,segment,mwh+100)+")";
			}
    	}
    	
    	if(!notificationSend) {
    		notificationSend = true;
    		sendNotification("I'm Latsuj !","Hello, thank you to visiting my website. If you wanna send me an email, use the form at the end of the website. I will answer you in the next 48 hours. Yeah I'm fast !")
    	}
    }
	
	// Lock or active the animation in function of the scroll
	function hasToLockAnimation() {
    	if(a <= 50) {
    		!runAnimation && animate();
    		clock.start();
    		lockAnimation = false;
    	} else if(a > 50) {
    		lockAnimation = true;
    	}
	}
	
	// Add a class when we approach a new frame
	function isNewFrame() {
		// Only doing thing when I'm going to a new frame
		if(!document.body.classList.contains("frame"+currentframe)) {
			document.body.classList.remove("frame0","frame1","frame2");
			document.body.classList.add("frame"+currentframe);
		}
    	segment - mwh <= 0 && document.body.classList.remove("new-frame");
	}
	
	// ================================================================================
	// For smooth scrolling - Adding some control for making a good experience for the use
	// ================================================================================
	var isMoving = false;
	document.onkeydown = function (e) {
	    var e = e || window.event;
	    if(!isMoving) {
	    	isMoving = true;
		    switch(e.keyCode) {
		    	// When the user press the key down - we scroll automaticaly down
		    	case 40:
	    	    	if(segment>=0 && segment<wh) {
	    	    		smoothScrollingTo(a,wh*(2*currentframe+1)+1);	    		
	    	    	} else {
	    	    		smoothScrollingTo(a,hf*(currentframe+1)+1);	
	    	    	}
		    		break;
		    	// Wehn the user press the key right, we open the menu or we switch page
		    	case 39:
	    	    	if(segment>=0 && segment<wh) {
	    	    		onMenu();	 
	    	    	} else {
	    	    		clickWrapInformation("right-click");
	    	    	}
	    	    	isMoving = false;   		
		    		break;
		    	//when the user press the key up - we scroll automaticaly up
		    	case 38:
	    	    	if(segment>=0 && segment<wh) {
	    	    		smoothScrollingTo(a,wh*(2*currentframe-1)+1);	
	    	    	} else {
	    	    		smoothScrollingTo(a,wh*(2*currentframe)+1);	    		
	    	    	}
		    		break;
			    	//when the user press the key left - we off the menu or we switch page
		    	case 37:
	    	    	if(segment>=0 && segment<wh) {
	    	    		offMenu();	
	    	    	} else {
	    	    		clickWrapInformation("left-click");	    		
	    	    	}
	    	    	isMoving = false;  
		    		break;
		    }
	    }
	};
	
	// I use this class for keeping the framerate to 60fps when the user scroll
	function stopScrolling() {
		document.body.classList.add("no-scrolling");
	}
	
	// Creating a smooth scroll to a position
	function smoothScrollingTo(pc,pf) {
		var b=pc,f=pf;
		var v=((f-b)/500)>>0;
		var acc=1;
	    var move = setInterval(function(){
	        window.scrollTo(0, b);
	        b += v>0 ? v+acc*2 : v-acc*2;
	        acc+=0.1;
	        if (v>=0 && b >= f) {
	        	window.scrollTo(0, f);
	        	lastScrollY=f;
	        	initialization();
		    	isMoving = false;
	        	clearInterval(move);
	        } else if(v<=0 && b <= f) {
	        	window.scrollTo(0, f);
	        	lastScrollY=f;
	        	initialization();
		    	isMoving = false;
	        	clearInterval(move);
	        }
	    }, 1);		
	}
	
	// ================================================================================
	// For the explications
	// ================================================================================	
	
	var buttonrightinformation = $n("blocs-inside-informations-right-page"),
	buttonleftinformation = $n("blocs-inside-informations-left-page"),
	wrapblocsinside = $n("blocs-inside"),
	wrapinformation = $n("blocs-inside-wrap"),
	areatextetitle = $n("area-texte-title"),
	areatextesubtitle = $n("area-texte-subtitle"),
	wrapinformationlength = wrapinformation.length,
	page = $n("page"),
	pagelength = page.length,
	click = 0;
	
	/**
	 * Add a class for all the wrap of informations
	 * this class is use for choosing the movement of the text (left or right)
	 */
	function addClassWrapInformation(nameClass) {
		for(var j=wrapinformationlength;j--;) {
			wrapinformation[j].classList.add(nameClass);
		}		
	}
	
	/**
	 * Remove a class for all the wrap of informations
	 * this class is use for choosing the movement of the text (left or right)
	 */
	function removeClassWrapInformation(nameClass) {
		for(var j=wrapinformationlength;j--;) {
			wrapinformation[j].classList.remove(nameClass);
			wrapinformation[j].classList.remove("clicked");
		}		
	}
	
	/**
	 * Once the user has clicked, he still on the button but I dont want the "hover" effect
	 * So I had a class for making left:0 the normal position when the cursor still on the button
	 */
	function clickOnceWrapInformation() {
		for(var j=wrapinformationlength;j--;) {
			wrapinformation[j].classList.add("clicked");
		}				
	}
	
	/**
	 * When the user click, we turn the page in one sense or an other
	 */
	function clickWrapInformation(nameClass) {
		var count = 0,pos=0;
		// Counting the number of block inside the wrap informations
		var children = wrapblocsinside[currentframe].childNodes;
		for(var z=children.length;z--;) {		
			// The span inside the div count like a children so I have to check the childrens by className
			if(wrapblocsinside[currentframe].childNodes[z].className != undefined && wrapblocsinside[currentframe].childNodes[z].className.indexOf("blocs-inside-wrap") !== -1) {
				count++;
			}
		}
		
		// I update the cursor
		if(nameClass=="right-click") {
			wrapblocsinside[currentframe].dataset.count = Math.min(count-1,wrapblocsinside[currentframe].dataset.count+1);
		} else {
			wrapblocsinside[currentframe].dataset.count = Math.max(0,wrapblocsinside[currentframe].dataset.count-1);
		}	
		
		// we change the image, so we add the effect and we remove it after x seconds
		backgroundphoto[currentframe].classList.add("active");
		areatextetitle[currentframe].classList.add("active");
		areatextetitle[currentframe].classList.add("active");
		areatextesubtitle[currentframe].classList.add("active");
		setTimeout(function() {
			for(var i=currentframe;i--;pos += 2);
			pos += parseInt(wrapblocsinside[currentframe].dataset.count);
			backgroundphoto[currentframe].style.backgroundImage = "url("+wrapinformation[pos].dataset.img+")";
			areatextetitle[currentframe].innerHTML = wrapinformation[(currentframe+1)*wrapblocsinside[currentframe].dataset.count].dataset.title;
			areatextesubtitle[currentframe].innerHTML = wrapinformation[(currentframe+1)*wrapblocsinside[currentframe].dataset.count].dataset.text;
			backgroundphoto[currentframe].classList.remove("active");			
			areatextetitle[currentframe].classList.remove("active");			
			areatextesubtitle[currentframe].classList.remove("active");			
		},600);
		
		// I update the page number (page number under the text area)	
		page[currentframe].innerHTML = (wrapblocsinside[currentframe].dataset.count*1+1)+" / "+count;
		
		var children = wrapblocsinside[currentframe].childNodes;
		for(var z=0,countZ=children.length,p=0;z<countZ;z++) {		
			// The span inside the div count like a children so I have to check the childrens by className
			if(wrapblocsinside[currentframe].childNodes[z].className != undefined && wrapblocsinside[currentframe].childNodes[z].className.indexOf("blocs-inside-wrap") !== -1) {					
				// If It's the frame that I have to show, i remove the two classes
				if(p==wrapblocsinside[currentframe].dataset.count) { 			
					wrapblocsinside[currentframe].childNodes[z].classList.remove("right-click","left-click");
				// If it's the frame after the one that I have to show
				} else if(p>wrapblocsinside[currentframe].dataset.count) {				
					wrapblocsinside[currentframe].childNodes[z].classList.remove("right-click");
					wrapblocsinside[currentframe].childNodes[z].classList.add("left-click");
				} else {
					wrapblocsinside[currentframe].childNodes[z].classList.add("right-click");
				}
				p++;
			}
		}		
	}
	
	// Then I'm adding the event for the differents button in the website
	for(var i=buttonrightinformation.length; i--;) {
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
	
	var menu = $n("menu"),
	menushow = $n("menu-show"),
	menuclose = $n("menu-close"),
	menushowlength = menushow.length;
	
	// For all the elements for showing the menu
	for(var i = menu.length;i--;) {
	    // I add an event when the user is clicking the element
	    menu[i].onclick = onMenu;
	}

	// For all the elements for showing the menu
	for(var i = menuclose.length; i--;) {
	    // I add an event when the user is clicking the element
	    menuclose[i].onclick = offMenu;
	}	
	
	// If the user open the menu
	function onMenu() {
    	// Then I show all the menu...(there are the exact same number of menu and menushow)
    	for(var j = menushowlength;j--;) {
	        menushow[j].classList.add("active");
		    menu[j].classList.add("active");
    	}
        return false;		
	}

	// if the user close the menu
	function offMenu() {
    	// Then I show all the menu...(there are the exact same number of menu and menushow)
    	for(var j = menushowlength;j--;) {
	        menushow[j].classList.remove("active");
		    menu[j].classList.remove("active");
    	}
        return false;		
	}	
	
	var projectx = $n("projectx"),
	menushowcurrent = $n("menu-show-current"),
	menushownext = $n("menu-show-next"),
	menushownexttext = $n("menu-show-next-text"),
	menushowprev = $n("menu-show-prev"),
	menushowprevtext = $n("menu-show-prev-text"),
	countmenu = 0,
	fmove = true;
	
	// Adding the event for changing the menu order
	for(var i = menushownext.length; i--;) {
		menushownext[i].onclick = nextMenu;
	}	
	for(var i = menushowprev.length;i--;) {
		menushowprev[i].onclick = prevMenu;
	}	
	
	for(var i = menushowcurrent.length;i--;) {
		menushowcurrent[i].onclick = goMenu;
	}		
	for(var i = menushownexttext.length; i--;) {
		menushownexttext[i].onclick = goMenuNext;
	}	
	for(var i = menushowprevtext.length; i--;) {
		menushowprevtext[i].onclick = goMenuPrev;
	}	
	
	function goMenu() {
		smoothScrollingTo(a,wh*(2*(countmenu%projectx.length)));	
	}
	
	function goMenuNext() {
		nextMenu();
		goMenu();
	}
	
	function goMenuPrev() {
		prevMenu();
		goMenu();
	}
	
	function prevMenu() {
		if(fmove) ountmenu = countmenu=3; //TODO Magic Number here - Refactoring coming
		fmove=false;
		countmenu = countmenu-1>0 ? countmenu-1:projectx.length;
		updateMenu();
	}
	
	function nextMenu() {
		fmove=false;
		countmenu++;	
		updateMenu();
	}
	
	function updateMenu() {
		// Changing the previous menu
		for(var i = menushowprevtext.length; i--;) {
			menushowprevtext[i].innerHTML = projectx[(countmenu-1)%projectx.length].innerHTML;
		}	
		// Changing the current menu
		for(var i = menushowcurrent.length; i--;) {
			menushowcurrent[i].innerHTML = projectx[countmenu%projectx.length].innerHTML;
		}		
		//Changing the next menu
		for(var i = menushownexttext.length; i--;) {
			menushownexttext[i].innerHTML = projectx[(countmenu+1)%projectx.length].innerHTML;
		}
	}

	// ================================================================================
	// Contact Form
	// ================================================================================	
	
	/**
	 * Function for validating the email
	 */
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	function validEmail(e) {
	    return re.test(String(e).toLowerCase());
	}
	
	// All the field that I want to check before the users is allowed to send me something
	var validation = $n("validation"),
	validator = $n("validator"),
	submit = $i("submit");
	for(var i = validation.length; i--;) {
		validation[i].addEventListener("keyup", valid);	
	}
	
	// Just a function for showing if a value is enter or not
	var ek,nbrk,vk;
	function valid(event) {		
		ek = event.target, nbrk = ek.dataset.nbr, vk = ek.value;
		// If the value is not empty or undefined
		// If the value is a real email
		if(vk!="" && vk!="undefined" && (nbrk!=1 || (nbrk==1 && validEmail(vk)))) {
			validator[nbrk].classList.add("valid");
			checkAllValidator();
			return true;
		}
		validator[nbrk].classList.remove("valid");
		checkAllValidator();
		return false;
	}
	
	// Chack if all the field has been fill, if yes, we unlock the submit button
	function checkAllValidator() {
		for(var i = validator.length; i--;) {
			if(!validator[i].classList.contains("valid")) {
				submit.classList.remove("valid");
				return false;
			}
		}
		submit.classList.add("valid");
		return true;
	}
	
	// Send the information to the script
	var sname,semail,smsg;
	function send() {
		sname = validation[0].value!="" ? validation[0].value : "";
		semail = validation[1].value!="" ? validation[1].value : "";
		smsg = validation[2].value!="" ? validation[2].value : "";
		var xhttp = new XMLHttpRequest();
		xhttp.responseType = 'json';
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.response);
			}
		};
		xhttp.open("POST", "form_action.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("sname="+sname+"&semail="+semail+"&smsg="+smsg);
	}

	// ================================================================================
	// Media queries
	// ================================================================================		
	var mediaqueries = false;
	// Load only the css for the media 
	function loadMediaQueries() {
		addStyle("../css/queries.css");
	}

	// ================================================================================
	// Visit website
	// ================================================================================	
	
	var projectlink = $n("project-link");
	for(var i=projectlink.length;i--;) {
		projectlink[i].addEventListener("click", projectlinks);
	}
	
	// Redirect the user to the website in the dataset
	function projectlinks(event) {
		window.location.href = event.target.dataset.link;
	}
	
	// ================================================================================
	// Switch languages
	// ================================================================================
	
	var language = "en",	
	languages = $n("languages");
	for(var i = languages.length; i--;) {
		languages[i].addEventListener("click", switchLanguages);	
	}
	
	// Switch the langauges between french and english
	function switchLanguages() {
		document.body.classList.add("nolchange");
		setTimeout(function() { 
			document.body.classList.remove("nolchange"); 
			document.body.classList.remove(language);
			language = language=="en" ? "fr" : "en";
			document.body.classList.add(language);
		},500);
	}
	
	// ================================================================================
	// Ad only if I can when things are not really busy
	// ================================================================================	
	if ('requestIdleCallback' in window) {
		requestIdleCallback(adConsole);
		
		Notification.requestPermission(function (status) {
			// Cela permet d'utiliser Notification.permission avec Chrome/Safari
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	}
	
	/**
	 * For sending a notyfication system to the user
	 */
	function sendNotification(title,body) {
        if (Notification.permission === "granted") {
            var n = new Notification(title,{"body": body,"icon": "imgs/cats.png"});
        }
	}
	
	function adConsole() {
		// Check if the user is not using a very old version of IE - in the case not, trolling him :p
		if (window.console){
			// If Some developper look in the console, I have to do something for him also :p
			console.log('%c-> www.latsuj.com <-\n%cHello Developer, You have pressed the F12 key, you want to check my code ?! \nThat\'s ok, I have nothing to hide.\nI\'m all geared up for that.\nLatsuj', 'background:#222;color:#ff4141;font-size:40px;text-decoration:none;',"color:#ff4141;font-size:20px");
		}
	}
});

