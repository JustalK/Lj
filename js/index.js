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
	// Check if the user is not using a very old version of IE - in the case not, trolling him :p
	if (window.console){
		// If Some developper look in the console, I have to do something for him also :p
		console.log('%c-> www.latsuj.com <-\n%cHello Developer, You have pressed the F12 key, you want to check my code ?! \nThat\'s ok, I have nothing to hide.\nI\'m all geared up for that.\nLatsuj', 'background:#222;color:#ff4141;font-size:40px;text-decoration:none;',"color:#ff4141;font-size:20px");
	}
	
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
	var fontorbitron = new FontFace("Orbitron", "url(./../fonts/orbitron-black-webfont.ttf)");
	var fontorbitronr = new FontFace("Orbitron Regular", "url(./../fonts/orbitron-regular-webfont.ttf)");
	
	// The others fonts that I have to load after the first one has been loaded (there are on the first screen)
	var fontmonserratlight = new FontFace("Montserrat Light", "url(./../fonts/montserrat-light-webfont.ttf)");
	var fonttekolight = new FontFace("Teko Light", "url(./../fonts/teko-light-webfont.ttf)");
	
	// And finally the fonts that can be loaded after that the first screen has been loaded
	var fonttekobold = new FontFace("Teko Bold", "url(./../fonts/teko-bold-webfont.ttf)");
	var fontmontserratbold = new FontFace("Montserrat Bold", "url(./../fonts/montserrat-bold-webfont.ttf)");
	var fonttekomedium = new FontFace("Teko Medium", "url(./../fonts/teko-medium-webfont.ttf)");
	var fontlatsuj = new FontFace("Latsuj", "url(./../fonts/latsuj.ttf)");
	
	// Then we load the first font !
	document.fonts.add(fontorbitron);
	fontorbitron.loaded.then(function() {
		// When the font is load, we make her appear on the website and we load the others...
		document.body.classList.add("show-orbitron");
		document.fonts.add(fontmonserratlight);
		document.fonts.add(fonttekolight);
		document.fonts.add(fontlatsuj);
		document.fonts.add(fontorbitronr);
		// As soon as the font are loaded, we made them appear on the website
		fontmonserratlight.loaded.then(function() {
			document.body.classList.add("show-montserratlight");
		});
		
		fontlatsuj.loaded.then(function() {
			document.body.classList.add("show-latsuj");
		});

		fontorbitronr.loaded.then(function() {
			document.body.classList.add("show-orbitronr");
		});		
		
		fonttekolight.loaded.then(function() {
			document.body.classList.add("show-tekolight");
			loadHighQualityImagesFirst();
		});

		document.fonts.ready.then(function() {
			loadTheGlobalCss();
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
    	loadAllTheOtherFont();
    	
    	// And we load the css file
    	var file = "../css/global.css";
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
		var background = document.getElementsByClassName("frame-first");
		var tmp = new Image();
		tmp.src = background[0].getAttribute("data-src");
		tmp.addEventListener('load',function() {
			for(i=0;i<this.length;i++) {
				// For a better maintainability, we gonna just add a class and make the all animation on the css
				this[i].classList.add("active");
			}
		}.bind(background));
	}
	
	// Function for loading the images HQ after all the page has been loaded
	var frames = document.getElementsByClassName("frame");
	var frameslength = frames.length; 
	function loadHighQualityImages() {
		// If we reach the end of the website, there are nothing to load
		if(currentframe*2+2>=frames.length) {
			return false;
		}
		// If I'm in a last segment
		if(segment-wh>0) {
			// The first element is load with the other function
			// @see loadHighQualityImagesFirst()
			var backgroundOnWait = [frames[currentframe*2+2],frames[currentframe*2+3]];
			var backgroundHQ = [new Image(),new Image()];
			// For each frame, we gonna create an object Image fro perloading all the image and add an event on them
			for(var i=0; i < 2 ; i++) {
				backgroundHQ[i].src = backgroundOnWait[i].getAttribute("data-src");
				backgroundHQ[i].addEventListener('load',function() {
					// For a better maintainability, we gonna just add a class and make the all animation on the css
					backgroundOnWait[this].classList.add("active");
				}.bind(i));
			}
		}
	}
	
	function loadPhoto() {
		var background = document.getElementById("FRAME1");
		var tmp = new Image();
		tmp.src = background.getAttribute("data-src");
		tmp.addEventListener('load',function() {
			// For a better maintainability, we gonna just add a class and make the all animation on the css
			this.classList.add("active");
		}.bind(background));
	}
	
	// ================================================================================
	// For the different calcul - Calcul all the important value;
	// ================================================================================
	var a, wh, mwh, b, c, segment, numberframe, currentframe, hf, bg, bh;
	
	// Initialize all the important variable
	function initialization() {
		// Current position of the user
		a = document.documentElement.scrollTop;
		// Height of the browser's windows of the user
		wh = window.innerHeight;
		mwh = wh>>1;
		// Height of the website
		bh = document.documentElement.clientHeight;
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
	var position = document.getElementById("POSITION");
	var timer;
	var framerateScroll = 1000/60;
	
	var blackout = document.getElementsByClassName("blackout-effect");
	var bigtitle = document.getElementsByClassName("big-title");
	var date = document.getElementsByClassName("date");
	var datelineup = document.getElementsByClassName("date-line-up");
	var datelinedown = document.getElementsByClassName("date-line-down");
	var areatextetitle = document.getElementsByClassName("area-texte-title");
	var areatextesubtitle = document.getElementsByClassName("area-texte-subtitle");
	var photo = document.getElementsByClassName("photo");
	var photowrap = document.getElementsByClassName("photo-wrap");
	var photolinevertical = document.getElementsByClassName("photo-line-vertical");
	var photolinehorizontal = document.getElementsByClassName("photo-line-horizontal");
	var photoblockvertical = document.getElementsByClassName("photo-block-vertical");
	var photoblockhorizontal = document.getElementsByClassName("photo-block-horizontal");
	var photosquare = document.getElementsByClassName("photo-square");
	var blocsinsideinformationstitle = document.getElementsByClassName("blocs-inside-informations-title");
	var backgroundphoto = document.getElementsByClassName("background-photo");
	var frameinformations = document.getElementsByClassName("frame-informations");
	var areas = document.getElementsByClassName("areas");
	var blocsinsidewrap = document.getElementsByClassName("blocs-inside-wrap");
	var refresh = true;
	var endRefresh = false;
	// For initializing the variable
	initialization();
	
	/**
	 * Creating an event on the croll but setting a framerate for smoothing the animation on every computer
	 */
	window.addEventListener('scroll', function() {
		if (!refresh) return;
		clearTimeout(endRefresh);
		refresh = false;

		scroll();
		
        setTimeout(function () {
            refresh = true;
        }, framerateScroll);
        // If the last event is a waiting, we make an other call to scroll - In that way, we add more accuracy to the project
        endRefresh = setTimeout(function () {
            scroll();
        }, 100);
	});
	
	/**
	 * The all actions done on one scroll
	 */
	function scroll() {
		// Initialisation of variables
		initialization();
		
        // For the little tricky effect - Moving the width of the bar when we scroll
    	position.style.width=c*100+"%";
    	// Play the animation only if we have not reach the footer yet
    	if(currentframe<frames.length/2) {
	    	blocsinsideinformationstitle[currentframe].style.marginLeft = wasmScrollReverse(30,30,10,0.1,segment,wh-mwh)+"px";
	    	blackout[currentframe].style.opacity = wasmScroll(0.5,0,0.001,segment,mwh);
	    	
	    	bigtitle[currentframe].style.cssText = "opacity:"+wasmScrollReverse(0.55,0.55,0,0.0006,segment,0)+";top:"+wasmScroll(mwh,80,0.8,segment,0)+"px";
	    	
	    	areatextetitle[currentframe].style.marginLeft = wasmScrollReverse(20,20,10,0.01,segment,wh)+"%";
	    	areatextesubtitle[currentframe].style.marginLeft = wasmScrollReverse(45,45,40,-0.005,segment,hf)+"%";
	    	
	    	date[currentframe].style.top = wasmScroll(50,20,0.1,segment,mwh-200)+"%";
	    	datelineup[currentframe].style.height = wasmScroll(32,0,0.1,segment,mwh+200)+"vh";
	    	datelinedown[currentframe].style.height = wasmScroll(32,0,0.1,segment,mwh+200)+"vh";
	    	
	    	photo[currentframe].style.cssText = "height:calc(100% - "+wasmScrollReverse(162,162,100,0.25,segment,mwh+100)+"px);width:calc(100% - "+wasmScrollReverse(162,162,100,0.25,segment,mwh+100)+"px)";
	    	photowrap[currentframe].style.marginTop = wasmScroll(200,50,0.4,segment,mwh+200)+"px";
	    	frameinformations[currentframe].style.backgroundPosition = "center "+wasmScroll(1000,0,0.5,segment,wh)+"px";
	    	areas[currentframe*2].style.cssText = "top: -"+wasmScroll(200,0,0.5,segment,wh+200)+"px";
	    	areas[currentframe*2+1].style.cssText = "top: -"+wasmScroll(200,0,0.5,segment,wh+200)+"px";
	    	
	    	blocsinsidewrap[currentframe*2].style.opacity = wasmScroll(1,0,0.003,segment,mwh);
	    	blocsinsidewrap[currentframe*2+1].style.opacity = wasmScroll(1,0,0.003,segment,mwh);
	    	blocsinsidewrap[currentframe*2+2].style.opacity = wasmScroll(1,0,0.003,segment,mwh);
	    	
	    	photolinehorizontal[currentframe*2].style.cssText = "width:"+wasmScroll(100,0,0.6,segment,mwh-200) + "%;left:"+wasmScrollReverse(50,50,0,0.3,segment,mwh-200)+"%"; 
	    	photolinehorizontal[currentframe*2+1].style.cssText = "width:"+wasmScroll(100,0,0.6,segment,mwh-200) + "%;left:"+wasmScrollReverse(50,50,0,0.3,segment,mwh-200)+"%"; 
	    	
	    	photolinevertical[currentframe*2].style.cssText = "height:"+wasmScroll(100,0,0.6,segment,mwh-200) + "%;top:"+wasmScrollReverse(50,50,0,0.3,segment,mwh-200)+"%";
	    	photolinevertical[currentframe*2+1].style.cssText = "height:"+wasmScroll(100,0,0.6,segment,mwh-200) + "%;top:"+wasmScrollReverse(50,50,0,0.3,segment,mwh-200)+"%";   	
	    	
			photoblockvertical[currentframe*2].style.width = wasmScroll(30,0,0.12,segment,mwh+100)+"px";
			photoblockvertical[currentframe*2+1].style.width = wasmScroll(30,0,0.12,segment,mwh+100)+"px";
			photoblockhorizontal[currentframe*2].style.height = wasmScroll(30,0,0.12,segment,mwh+100)+"px";
			photoblockhorizontal[currentframe*2+1].style.height = wasmScroll(30,0,0.12,segment,mwh+100)+"px";
	    	
			backgroundphoto[currentframe].style.transform = "scale("+wasmScrollReverse(1.5,1.5,1,0.001,segment,mwh)+","+wasmScrollReverse(1.5,1.5,1,0.001,segment,mwh)+") rotateZ("+wasmScrollReverse(30,30,0,0.06,segment,mwh-200)+"deg)";
			
			for(var i=0;i<4;i++) {
				photosquare[currentframe*4+i].style.cssText = "width:"+wasmScroll(30,0,0.12,segment,mwh+100)+"px;height:"+wasmScroll(30,0,0.12,segment,mwh+100)+"px";
			}
    	}
		
		if(segment - mwh > 0) {
			// If I have not been in this loop for this frame
			if(bg.dataset.load!=1) {
				bg.dataset.load = 1;
				bg.style.backgroundImage = "url("+bg.dataset.imglow+")";
				// I create a new image for preload the content
				var tmp = new Image();
				tmp.src = backgroundphoto[currentframe].dataset.img;
				tmp.addEventListener('load',function() {
					this.style.backgroundImage = "url("+this.dataset.img+")";
				}.bind(bg));
			}
		}
		
		// Load the image with LQIP technique at the right moment
		loadHighQualityImages();
		
    	isNewFrame();
    	
    	// When the user stop scrolling - we add an action of this
    	if(timer!==null) {
    		clearTimeout(timer);
    	}
		document.body.classList.remove("no-scrolling");
        timer = setTimeout(stopScrolling, 300);
	}
	
	// Add a class when we approach a new frame
	function isNewFrame() {
		//TODO Refactoring this part please
		document.body.classList.remove("frame0","frame1","frame2");
		document.body.classList.add("frame"+currentframe);
    	if(segment - mwh > 0) {
    		document.body.classList.add("new-frame");
    	} else {
    		document.body.classList.remove("new-frame");
    	}
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
	    	    		smoothScrollingTo(a,wh*(2*currentframe+1));	    		
	    	    	} else {
	    	    		smoothScrollingTo(a,hf*(currentframe+1));	
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
	    	    		smoothScrollingTo(a,wh*(2*currentframe-1));	
	    	    	} else {
	    	    		smoothScrollingTo(a,wh*(2*currentframe));	    		
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
		var a=1;
	    var move = setInterval(function(){
	        window.scrollTo(0, b);
	        b += v>0 ? v+a*2 : v-a*2;
	        a+=0.1;
	        if (v>=0 && b >= f) {
	        	window.scrollTo(0, f);
		    	isMoving = false;
	        	clearInterval(move);
	        } else if(v<=0 && b <= f) {
	        	window.scrollTo(0, f);
		    	isMoving = false;
	        	clearInterval(move);
	        }
	    }, 1);		
	}
	
	// ================================================================================
	// For the explications
	// ================================================================================	
	
	var buttonrightinformation = document.getElementsByClassName("blocs-inside-informations-right-page");
	var buttonleftinformation = document.getElementsByClassName("blocs-inside-informations-left-page");
	var wrapblocsinside = document.getElementsByClassName("blocs-inside");
	var wrapinformation = document.getElementsByClassName("blocs-inside-wrap");
	var areatextetitle = document.getElementsByClassName("area-texte-title");
	var areatextesubtitle = document.getElementsByClassName("area-texte-subtitle");
	var wrapinformationlength = wrapinformation.length;
	var page = document.getElementsByClassName("page");
	var pagelength = page.length;
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
	
	/**
	 * Once the user has clicked, he still on the button but I dont want the "hover" effect
	 * So I had a class for making left:0 the normal position when the cursor still on the button
	 */
	function clickOnceWrapInformation() {
		for(var j=0; j < wrapinformationlength ; j++) {
			wrapinformation[j].classList.add("clicked");
		}				
	}
	
	/**
	 * When the user click, we turn the page in one sense or an other
	 */
	function clickWrapInformation(nameClass) {
		var count = 0;
		// Counting the number of block inside the wrap informations
		var children = wrapblocsinside[currentframe].childNodes;
		for(var z=0;z<children.length;z++) {		
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
			backgroundphoto[currentframe].style.backgroundImage = "url("+wrapinformation[(currentframe+1)*wrapblocsinside[currentframe].dataset.count].dataset.img+")";
			areatextetitle[currentframe].innerHTML = wrapinformation[(currentframe+1)*wrapblocsinside[currentframe].dataset.count].dataset.title;
			areatextesubtitle[currentframe].innerHTML = wrapinformation[(currentframe+1)*wrapblocsinside[currentframe].dataset.count].dataset.text;
			backgroundphoto[currentframe].classList.remove("active");			
			areatextetitle[currentframe].classList.remove("active");			
			areatextesubtitle[currentframe].classList.remove("active");			
		},600);
		
		// I update the page number (page number under the text area)	
		page[currentframe].innerHTML = (wrapblocsinside[currentframe].dataset.count*1+1)+" / "+count;
		
		var children = wrapblocsinside[currentframe].childNodes;
		for(var z=0,p=0;z<children.length;z++) {		
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
	var menuclose = document.getElementsByClassName("menu-close");
	var menushowlength = menushow.length;
	
	// For all the elements for showing the menu
	for(var i = 0,count = menu.length; i < count; i++) {
	    // I add an event when the user is clicking the element
	    menu[i].onclick = onMenu;
	}

	// For all the elements for showing the menu
	for(var i = 0,count = menuclose.length; i < count; i++) {
	    // I add an event when the user is clicking the element
	    menuclose[i].onclick = offMenu;
	}	
	
	// If the user open the menu
	function onMenu() {
    	// Then I show all the menu...(there are the exact same number of menu and menushow)
    	for(var j = 0; j < menushowlength; j++) {
	        menushow[j].classList.add("active");
		    menu[j].classList.add("active");
    	}
        return false;		
	}

	// if the user close the menu
	function offMenu() {
    	// Then I show all the menu...(there are the exact same number of menu and menushow)
    	for(var j = 0; j < menushowlength; j++) {
	        menushow[j].classList.remove("active");
		    menu[j].classList.remove("active");
    	}
        return false;		
	}	
	
	var projectx = document.getElementsByClassName("projectx");
	var menushowcurrent = document.getElementsByClassName("menu-show-current");
	var menushownext = document.getElementsByClassName("menu-show-next");
	var menushownexttext = document.getElementsByClassName("menu-show-next-text");
	var menushowprev = document.getElementsByClassName("menu-show-prev");
	var menushowprevtext = document.getElementsByClassName("menu-show-prev-text");
	var countmenu = 0;
	var fmove = true;
	
	// Adding the event for changing the menu order
	for(var i = 0,count = menushownext.length; i < count; i++) {
		menushownext[i].onclick = nextMenu;
	}	
	for(var i = 0,count = menushowprev.length; i < count; i++) {
		menushowprev[i].onclick = prevMenu;
	}	
	
	for(var i = 0,count = menushowcurrent.length; i < count; i++) {
		menushowcurrent[i].onclick = goMenu;
	}		
	for(var i = 0,count = menushownexttext.length; i < count; i++) {
		menushownexttext[i].onclick = goMenuNext;
	}	
	for(var i = 0,count = menushowprevtext.length; i < count; i++) {
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
		if(fmove) ountmenu = countmenu=3;
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
		for(var i = 0,count = menushowprevtext.length; i < count; i++) {
			menushowprevtext[i].innerHTML = projectx[(countmenu-1)%projectx.length].innerHTML;
		}	
		// Changing the current menu
		for(var i = 0,count = menushowcurrent.length; i < count; i++) {
			menushowcurrent[i].innerHTML = projectx[countmenu%projectx.length].innerHTML;
		}		
		//Changing the next menu
		for(var i = 0,count = menushownexttext.length; i < count; i++) {
			menushownexttext[i].innerHTML = projectx[(countmenu+1)%projectx.length].innerHTML;
		}
	}
	
	// ================================================================================
	// PARALLAX
	// ================================================================================
	
	var parallax = document.getElementsByClassName("parallax");
	document.onmousemove = moveElements;
	
	function moveElements(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
		for(var i = 0,count = parallax.length; i < count; i++) {
			parallax[i].style.backgroundPosition = "0 calc(50% - "+(event.pageY%(2*hf))*0.2+"px)";
		}
	}
	
});










