/**
*============================================================================================>
* Util function 
*============================================================================================> 
**/
/**
 * Convert from degree to radians
 */
Math.radians = function(degrees) {
	  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

/**
 * Give a random number betwenn -1 and 1
 */
Math.randomRange = function () {
	return (Math.random() - 0.5)*2;
}

/**
*============================================================================================>
* Constant and variables 
*============================================================================================> 
**/

/** The Three Camera **/
var camera;
/** Framerate **/
var framerate = 1000/60;
/** The render **/
var renderer;
/** The scene where every mesh and object gonna be **/
var scene;
/** My special window */
var board;
/** The position of mouse of the user **/
var mouse = { x: 0, y: 0 };
/** Object that keep a track on the time */
var clock;
/** The differents objects with those raycaseter can interact **/
var objectInteraction = [];
// The array of the mesh group of the scene
var groupScene = [];
// The differents object that create the particle system
var smokeParticles = [];
// True if the camera is actually moving to a new position, false if else
var movementCamera = false;
// The direction of the movement when we translation to a new position
var movements = [0,0,0];
// The direction of the rotation when we rotate to a new position
var rotation = [0,0,0];
// The final position of our camera
var positionFinal = [0,0,0];
// The final rotation of our camera
var rotationFinal = [0,0,0];
// Check if the position is reached on all abscisse
var positionReached = [false,false,false];
// Check if the final rotation is reached on all abscisse
var rotationReached = [false,false,false];
// The speed of the camera when it's translating to a new position
var speedTranslation = [0,0,0];
// The speed of the camera when it's rotating to a new position
var speedRotation = [0,0,0];
// If the user is on a back button
var backButton = false;
// The object for the intersection between the mouse and the camera
var raycaster;
// The object with who the mouse is hover it
var intersects;
var triangleIntersects;
// Block the animation when true
var lockAnimation = false;
// For knowing if the animation is actually running
var runAnimation = false;

/* Constants */
var FOV = 50;
var ABSCISSA = ["x","y","z"];
var WINDOWS_WIDTH = window.innerWidth;
var WINDOWS_HEIGHT = window.innerHeight;
var BACKGROUND_COLOR = 0x000000;
var LIGHT_AMBIANT_COLOR = 0xFFFFFF;
var TRIANGLE_COLOR = 0x000000;
var TRIANGLE_COLOR_HOVER = 0xFFFFFF;
var WIREFRAME_COLOR = 0x555555;
var WIREFRAME_COLOR_HOVER = 0x000000;
var BOARD_COLOR = 0x333333;
var CAMERA_START_POSITION_X = 0;
var CAMERA_START_POSITION_Y = 0;
var CAMERA_START_POSITION_Z = 8000;
var CAMERA_START_ROTATION_X = 0;
var CAMERA_START_ROTATION_Y = 0;
var CAMERA_START_ROTATION_Z = 0;
var TEXTURE_BOARD_EXTREMITY = "textures/dark4.jpg";
var TEXTURE_BUTTON_BACK = new THREE.TextureLoader().load('imgs/back.png');
var TEXTURE_BUTTON_VISIT = new THREE.TextureLoader().load('imgs/visit.png');
var TEXTURE_SMOKE = './textures/smoke.png';
var DEFAULT_MOVEMENT_CAMERA_SPEED = 1;
var DEFAULT_ROTATION_CAMERA_SPEED = 1;
var DEFAULT_SMOKE_ROTATION_SPEED = 0.05;
var DEFAULT_RANGE_WITHOUT_SMOKE = WINDOWS_HEIGHT/2;
var DEFAULT_ROTATION_PERPETUAL_X = 0.001;
var DEFAULT_ROTATION_PERPETUAL_Y = 0.002;
var DEFAULT_ROTATION_PERPETUAL_X_START = 0;
var DEFAULT_ROTATION_PERPETUAL_Y_START = 0;
var DEFAULT_ROTATION_PERPETUAL_X_AMPLITUDE = 20;
var DEFAULT_ROTATION_PERPETUAL_Y_AMPLITUDE = 15;
var DEFAULT_ROTATION_PERPETUAL_X_SPEED = 100;
var DEFAULT_ROTATION_PERPETUAL_Y_SPEED = 200;
var FOG_POWER = 0.0002;
var extrudeSettings = { amount: 10, bevelEnabled: true, bevelSegments: 1, steps: 2, bevelSize: 3, bevelThickness: 3 };

/**
*============================================================================================>
* Initialisation
*============================================================================================> 
**/

/**
* The initial function
**/
function init() {
	initCamera();
	initScene(BACKGROUND_COLOR);
	initLight(LIGHT_AMBIANT_COLOR);
	initClock();
	initFog(false);
	initRaycaster();
	createWorld();
	
	groupScene.push(createBoard('imgs/zipWorld.jpg',"https://www.google.fr/",'imgs/test.png',-400,-20,6600,0,0,Math.radians(20),-400,-30,7100,0,0,Math.radians(20)));
	childrens = groupScene[0].children;
	if(childrens!=null) {
		for(var i=childrens.length;i--;) {
			if(childrens[i]["panel"]) {
				childrens[i].material[4].opacity = 1;
			}
		}
	}
	groupScene.push(createBoard('imgs/gouterMagique.jpg',"https://www.google.fr/",'imgs/test.png',-500,1300,2600,0,0,Math.radians(50),-500,1300,3000,0,0,Math.radians(50)));
	groupScene.push(createBoard('imgs/hapee.jpg',"https://www.google.fr/",'imgs/test.png',500,100,4000,0,Math.radians(-90),Math.radians(-40),500,150,4500,0,0,Math.radians(-40)));
	groupScene.push(createBoard('imgs/promarine.jpg',"https://www.google.fr/",'imgs/test.png',-1600,500,4600,0,0,Math.radians(-60),-1550,500,4900,0,0,Math.radians(-60)));
	groupScene.push(createBoard('imgs/onarto.jpg',"https://www.google.fr/",'imgs/test.png',1800,1800,1000,0,0,Math.radians(-60),1800,1800,1500,0,0,Math.radians(-60)));
	groupScene.push(createBoard('imgs/odyssea.jpg',"https://www.google.fr/",'imgs/test.png',2000,250,2400,0,0,Math.radians(-70),2000,250,3000,0,0,Math.radians(-70)));

	for(var i=groupScene.length;i--;) {
		scene.add(groupScene[i]);		
	}
	
	renderWebGL();
	document.getElementById("FRAME1").appendChild( renderer.domElement );

	// Events
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

/**
* Initialize the camera
**/
function initCamera() {
	camera = new THREE.PerspectiveCamera( FOV, WINDOWS_WIDTH / WINDOWS_HEIGHT, 1, 15000 );
	camera.position.set(CAMERA_START_POSITION_X,CAMERA_START_POSITION_Y,CAMERA_START_POSITION_Z);
	camera.rotation.set(CAMERA_START_ROTATION_X,CAMERA_START_ROTATION_Y,CAMERA_START_ROTATION_Z);
}

/**
* Initialize the scene
* @param hex color The background's color of the scene
**/
function initScene(color) {
	scene = new THREE.Scene();
	scene.background = new THREE.Color( color );
}

/**
* Initialize the light of this scene
* @param hex color The general light's color of the scene
**/	
function initLight(color) {
	scene.add(new THREE.AmbientLight(color,0.8));
	var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	light.position.set(0,0,8000);
	scene.add( light );
}

/**
* Initialize the clock save
**/
function initClock() {
	clock = new THREE.Clock();
	// Set the time to 0
	clock.start();
}

/**
* Initialize the fog
* @param boolean fog Active the fog if true
**/
function initFog(fog) {
	if(fog) scene.fog = new THREE.FogExp2( 0x000000, FOG_POWER );
}

/**
 * Initialize the raycaster
 * @returns
 */
function initRaycaster() {
	raycaster = new THREE.Raycaster();
	raycaster.setFromCamera( mouse, camera );
}

/**
* Setting the parameter for the WebGL
**/
function renderWebGL() {
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.powerPreference = "high-performance";
}

/**
*============================================================================================>
* Creating the world
*============================================================================================> 
**/
/**
 * Create the background of the scene with a lot of triangle
 */
function createWorld() {
	addObject3(500,-200,7000, 1000,-1000,7000, 3000,1500,7000);
	addObject3(500,-200,7000, 1000,1000,7000, 3000,1500,7000);
	addObject3(500,-200,7000, 1000,1000,7000, 0,0,7000);
	addObject3(0,300,7000, 1000,1000,7000, 0,0,7000);
	addObject3(0,300,7000, -300,200,7000, 0,0,7000);
	addObject3(0,300,7000, -300,200,7000, -500,500,7000);
	addObject3(0,300,7000, -300,2000,7000, -500,500,7000);
	addObject3(0,300,7000, -300,2000,7000, 1000,1000,7000);
	addObject3(-700,0,7000, -300,200,7000, -500,500,7000);
	addObject3(-700,0,7000, -2000,2000,7000, -500,500,7000);
	addObject3(-700,0,7000, -2000,2000,7000, -800,-200,7000);
	addObject3(-700,-2000,7000, -2000,2000,7000, -800,-200,7000);
	addObject3(-700,-2000,7000, -400,-200,7000, -800,-200,7000);
	addObject3(-700,0,7000, -400,-200,7000, -800,-200,7000);
	addObject3(0,0,7000, -400,-200,7000, -100,-400,7000);
	addObject3(0,0,7000, 500,-200,7000, -100,-400,7000);
	addObject3(-700,-2000,7000, 500,-200,7000, -100,-400,7000);
	addObject3(-700,-2000,7000, 500,-200,7000, 1000,-1000,7000);
	addObject3(-700,-2000,7000, -400,-200,7000, -100,-400,7000);
}

/**
 * Create a triangle at a particular position using the vertices
 * @param x1 The position X of the vertice 1
 * @param y1 The position Y of the vertice 1
 * @param z1 The position Z of the vertice 1
 * @param x2 The position X of the vertice 2
 * @param y2 The position Y of the vertice 2
 * @param z2 The position Z of the vertice 2
 * @param x3 The position X of the vertice 3
 * @param y3 The position Y of the vertice 3
 * @param z3 The position Z of the vertice 3
 */
var mTriangle = new THREE.MeshStandardMaterial( { color : 0xFFFFFF, wireframe: true } );
var triangleHover = [];
var fTriangle = new THREE.Face3( 0, 1, 2 );
function addObject3(x1,y1,z1,x2,y2,z2,x3,y3,z3) {
	var geometries = [new THREE.Geometry(),new THREE.Geometry()];
	for(var i=geometries.length;i--;) {
		geometries[i].vertices.push( new THREE.Vector3(x1,y1,z1-i));
		geometries[i].vertices.push( new THREE.Vector3(x2,y2,z2-i));
		geometries[i].vertices.push( new THREE.Vector3(x3,y3,z3-i));
		geometries[i].faces.push( fTriangle );
		geometries[i].computeFaceNormals();
		geometries[i].computeVertexNormals();
	}
	scene.add( new THREE.Mesh( geometries[0], mTriangle ) );
	// It's not the fastest way to do it but it's the one using the less memory
	var mTriangleBlack = new THREE.MeshStandardMaterial( { color : TRIANGLE_COLOR } );
	mTriangleBlack.side = THREE.DoubleSide;
	triangleHover.push(new THREE.Mesh( geometries[1], mTriangleBlack ));
	scene.add(triangleHover[triangleHover.length-1]);	
}

/**
*============================================================================================>
* Creating the object
*============================================================================================> 
**/

/**
* Create a board in the scene
* @param string textureCenter The texture of the center of the board 
* @param string url The url of the site of the board - open a new tab on this link 
* @param int x The position X of the object
* @param int y The position Y of the object
* @param int z The position Z of the object
* @param int rx The rotation X of the object
* @param int ry The rotation Y of the object
* @param int rz The rotation Z of the object
* @return One board with all his pieces
**/
function createBoard(textureCenter,url,textureInformations,x,y,z,rx,ry,rz,translationX,translationY,translationZ,rotationX,rotationY,rotationZ) {
	// The mesh of thge board, it has been done with the different mesh that I'm gonna create there
	boardTmp = new THREE.Group();

	// Construct the mesh piece by piece
	piece = [];
	piece.push(createSideBoard(-100,0,0,0,0,0));
	piece.push(createSideBoard(80,0,10,0,Math.PI,0));	
	piece.push(createSideWireframe(-100,0,0,0,0,0));
	piece.push(createSideWireframe(80,0,10,0,Math.PI,0));
	piece.push(createCenterWireframe(-10,50,4,0,0,0));
	piece.push(createCenterBoard(textureCenter,-10,50,8));
	piece.push(createPanel(textureInformations,140, 40, 1,-10,110,8));
	// The back button has to be the 7th mesh because of the return implementation
	piece.push(createPanelWithTexture(TEXTURE_BUTTON_BACK,40, 20, 1,20,-10,8));
	piece.push(createPanelWithTexture(TEXTURE_BUTTON_VISIT,40, 20, 1,-40,-10,8));

	
	// Add the differents parts to the group of meshes
	for(var i=piece.length;i--;) {
		boardTmp.add(piece[i]);
	}

	// Add each mesh to the objectInteract for letting the user play with them
	for(var i=piece.length;i--;) {
		objectInteraction.push(piece[i]);
	}
	
	// Value for the perpetual movement
	boardTmp["translationx"] = translationX;
	boardTmp["translationy"] = translationY;
	boardTmp["translationz"] = translationZ;
	boardTmp["rotationx"] = rotationX;
	boardTmp["rotationy"] = rotationY;
	boardTmp["rotationz"] = rotationZ;
	boardTmp["lock"] = false;
	boardTmp["url"] = url;

	// Position of the board in the scene
	boardTmp.position.set(x,y,z);
	boardTmp.rotation.set(rx,ry,rz);
	
	return boardTmp
}

/**
* Return the shape of the left part of the board
**/
function createShape() {
	var leftShape = new THREE.Shape();
	leftShape.moveTo( -5, -10 );
	leftShape.lineTo( 0, 20 );
	leftShape.lineTo( 10, 30 );
	leftShape.lineTo( 10, 70 );
	leftShape.lineTo( 0, 80 );
	leftShape.lineTo( -5, 110 );
	leftShape.lineTo( 40, 100 );
	leftShape.lineTo( 45, 90 );
	leftShape.lineTo( 25, 90 );
	leftShape.lineTo( 20, 85 );
	leftShape.lineTo( 20, 15 );
	leftShape.lineTo( 25, 10 );
	leftShape.lineTo( 45, 10 );
	leftShape.lineTo( 40, 5 );
	return leftShape;
}

/**
* Create the extremity of the board
* @param int x The position X of the object
* @param int y The position Y of the object
* @param int z The position Z of the object
* @param int rx The rotation X of the object
* @param int ry The rotation Y of the object
* @param int rz The rotation Z of the object
* @return Mesh The mesh of this side of the board
**/
function createSideBoard(x,y,z,rx,ry,rz) {
	texture = new THREE.TextureLoader().load(TEXTURE_BOARD_EXTREMITY);
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(0.005, 0.005);
	
	materialBoard = new THREE.MeshPhongMaterial( {  color: BOARD_COLOR } );
	geometryBoard = new THREE.ExtrudeGeometry( createShape(), extrudeSettings );
	sideMesh = new THREE.Mesh( geometryBoard, materialBoard );	

	sideMesh.position.set( x, y, z );
	sideMesh.rotation.set( rx, ry, rz );
	return sideMesh;
}

/**
* Create the center of the board
* @param string textureCenter The texture of the center of the board
* @param int x The position X of the object
* @param int y The position Y of the object
* @param int z The position Z of the object
* @return Mesh The center piece of the board
**/
function createCenterBoard(textureCenter,x,y,z) {
	texture = new THREE.TextureLoader().load( textureCenter );
	material = new THREE.MeshBasicMaterial( { map: texture } );
	centerMesh =  new THREE.Mesh( new THREE.BoxBufferGeometry( 150, 75, 1 ),  [0,0,0,0,material,0] );
	centerMesh.position.set(x,y,z);
	return centerMesh;
}

/**
* Create a panel on the board by using the texture path
* @param string texture The path for the texture
* @param int sx The size on X of the panel 
* @param int sy The size on Y of the panel 
* @param int sz The size on Z of the panel 
* @param int x The position on x of the panel 
* @param int y The position on y of the panel 
* @param int z The position on z of the panel 
* @return mesh The panel
**/
function createPanel(texture,sx,sy,sz,x,y,z) {
	return createPanelWithTexture(new THREE.TextureLoader().load( texture ),sx,sy,sz,x,y,z);
}

/**
* Create a panel on the board by using the texture object
* @param string texture The path for the texture
* @param int sx The size on X of the panel 
* @param int sy The size on Y of the panel 
* @param int sz The size on Z of the panel 
* @param int x The position on x of the panel 
* @param int y The position on y of the panel 
* @param int z The position on z of the panel 
* @return mesh The panel
**/
function createPanelWithTexture(texture,sx,sy,sz,x,y,z) {
	material = new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity: 0 } );
	informationsMesh =  new THREE.Mesh( new THREE.BoxBufferGeometry( sx, sy, sz ), [0,0,0,0,material,0] );
	informationsMesh.position.set(x,y,z);
	informationsMesh["panel"] = true;
	return informationsMesh;	
}

/**
* Create the wireframe effect around the element
* @param int x The position X of the object
* @param int y The position Y of the object
* @param int z The position Z of the object
* @param int rx The rotation X of the object
* @param int ry The rotation Y of the object
* @param int rz The rotation Z of the object
* @return Mesh The wireframe element
**/
function createSideWireframe(x,y,z,rx,ry,rz) {
	geometryBoard = new THREE.ExtrudeGeometry( createShape(), extrudeSettings );
	material = new THREE.LineBasicMaterial( { color: WIREFRAME_COLOR, linewidth: 1 } );
	sideWireframe = new THREE.LineSegments( new THREE.EdgesGeometry( geometryBoard ), material );
	sideWireframe["wireframe"] = true;
	sideWireframe.position.set( x, y, z );
	sideWireframe.rotation.set( rx, ry, rz );
	return sideWireframe;
}

// Same as previously but create a wireframe for the center
function createCenterWireframe(x,y,z,rx,ry,rz) {
	geometryBoard = new THREE.BoxBufferGeometry( 150, 75, 1 );
	material = new THREE.LineBasicMaterial( { color: WIREFRAME_COLOR, linewidth: 1 } );
	sideWireframe = new THREE.LineSegments( new THREE.EdgesGeometry( geometryBoard ), material );
	sideWireframe["wireframe"] = true;
	sideWireframe.position.set( x, y, z );
	sideWireframe.rotation.set( rx, ry, rz );
	return sideWireframe;
}

/**
*============================================================================================>
* Animations
*============================================================================================> 
**/

var parent = null;
var childrens = null;
var zoomIn = false;
var zoomOn = null;
function animate() {
	// If I scroll down, I lock the animation for using less memory
	if(!lockAnimation) {
		runAnimation = true;
		// Setting the number of refresh - Frame rate
		updateAnimation = setTimeout( function() {
			requestAnimationFrame( animate );
		}, framerate );
		renderer.render( scene, camera );
	
		delta = clock.getDelta();
		
		for(var i=groupScene.length;i--;) {
			perpetual(groupScene[i]);
		}
	
		// If I'm on a movement, I cannot change the parent, so the raycaster is not usefull
		if(movementCamera && parent!=null) {
			document.body.style.cursor = "inherit";
			// If I have not reached the final position on each abcisse
			if(isPositionNotReached()) { 
				moveCameraToBoard();
			} else {
				movementCamera=false;
				resetPositionReached();
			}
		} else {
			searchingMatchMouseAndMesh();
		}
	} else {
		clock.stop();
		runAnimation = false;
	}
}

/**
 * Test if I have reached or not the finla position
 * @returns boolean Return true if I have not reach the final position, false if else 
 */
function isPositionNotReached() {
	for(var i=ABSCISSA.length;i--;) {
		if(!positionReached[i] || !rotationReached[i]) return true;
	}
	return false;
}

/**
 * Reset the variable once the position is reached for allowing the movement again
 */
function resetPositionReached() {
	positionReached = [false,false,false];
	rotationReached = [false,false,false];
}

/**
 * Search is the user is on a mesh or an object for interaction
 */
function searchingMatchMouseAndMesh() {
	raycaster.setFromCamera( mouse, camera );
	intersects = raycaster.intersectObjects( objectInteraction, true );	
	triangleIntersects = raycaster.intersectObjects( triangleHover, true );	
	
	if(triangleIntersects.length>0) {
		for(var i=triangleHover.length;i--;) {
			if(triangleIntersects[0].object==triangleHover[i]) {
				triangleHover[i].material.color = new THREE.Color(TRIANGLE_COLOR_HOVER);
			} else {
				triangleHover[i].material.color = new THREE.Color(TRIANGLE_COLOR); 
			}
		}		
	} else {
		if(intersects.length>0) {
			// If the user trying to interact with a new mesh
			if(parent==null || parent!=intersects[0].object.parent) {
				document.body.style.cursor = "pointer";
				parent = intersects[0].object.parent;
				if(childrens!=null) {
					if(zoomIn==false || (zoomOn!=null && zoomOn.children!=childrens)) {
						for(var i=childrens.length;i--;) {
							if(childrens[i]["panel"]) {
								childrens[i].material[4].opacity = 0;
							}
						}
					} else {
						for(var i=childrens.length;i--;) {
							// If I'm on the button "back" or "visit" we make a little effect on it
							if((i==1 || i==0) && intersects[0].object==childrens[i]) {
								childrens[i].material[4].color = new THREE.Color("#327DFF");
							}
						}
					}
				}
				childrens = parent.children;
				for(var i=childrens.length;i--;) {
					if(childrens[i]["wireframe"]) {
						childrens[i].material.color = new THREE.Color(WIREFRAME_COLOR_HOVER);
					}
					if(childrens[i]["panel"]) {
						childrens[i].material[4].opacity = 1;
					}
				}
			}
		} else {
			document.body.style.cursor = "inherit";
			if(childrens!=null) {
				if(zoomIn==false || (zoomOn!=null && zoomOn.children!=childrens)) {
					for(var i=childrens.length;i--;) {
						if(childrens[i]["wireframe"]) {
							childrens[i].material.color = new THREE.Color(WIREFRAME_COLOR);
						}
					}
				}
				for(var i=childrens.length;i--;) {
					if(i==1 || i==0) childrens[i].material[4].color = new THREE.Color("#FFFFFF");
				}
			}
			backButton = false;
			parent=null;
		}	
	}
}

/**
*============================================================================================>
* Calculations
*============================================================================================> 
**/

/**
 * Make the object moving forever - add some animation event when the user is not doing anything
 * @param mesh board The board that we want to move
 */ 
function perpetual(board) {
	board.rotation.x = (Math.radians(DEFAULT_ROTATION_PERPETUAL_X_START) + Math.cos(clock.elapsedTime*DEFAULT_ROTATION_PERPETUAL_X_SPEED * DEFAULT_ROTATION_PERPETUAL_X) * Math.radians(DEFAULT_ROTATION_PERPETUAL_X_AMPLITUDE));
	board.rotation.y = (Math.radians(DEFAULT_ROTATION_PERPETUAL_Y_START) + Math.cos(clock.elapsedTime*DEFAULT_ROTATION_PERPETUAL_Y_SPEED * DEFAULT_ROTATION_PERPETUAL_Y + 300) * Math.radians(DEFAULT_ROTATION_PERPETUAL_Y_AMPLITUDE));
}

/**
* Move the camera to a new position
**/
function moveCameraToBoard() {
	for(var i=movements.length;i--;) {
		if(isMoveCameraTo(movements[i],camera.position.getComponent(i),positionFinal[i])) {
			add = delta * movements[i] * speedTranslation[i];
			camera.position.setComponent(i,camera.position.getComponent(i) + add);
		} else {
			positionReached[i] = true;
		}
		if(isMoveCameraTo(rotation[i],camera.rotation.toVector3().getComponent(i),rotationFinal[i])) {
			add = delta * rotation[i] * speedRotation[i];			
			camera.rotation[ABSCISSA[i]] = camera.rotation.toVector3().getComponent(i) + add;
		} else {
			rotationReached[i] = true;
		}
	}
}

/**
* Determine if I have to move the camera to the final destination depending of the actual position of the camera
* @param int movement The way of the movement 1 for upward and -1 for backward
* @param int cameraPosition The actual position of the camera
* @param int finalDestination The final destination of the camera
* @return boolean True if the camera has to be move or false 
**/
function isMoveCameraTo(movement,cameraPosition,finalDestination) {
	return (movement>0 && cameraPosition<finalDestination) || (movement<0 && cameraPosition>finalDestination);
}

/**
 * Calcul the speed for the translation's movement
 **/
function getSpeedMovement() {
	for(var i=ABSCISSA.length;i--;) {
		speedTranslation[i] = Math.abs(camera.position.getComponent(i)-positionFinal[i])*DEFAULT_MOVEMENT_CAMERA_SPEED;
		speedRotation[i] = Math.abs(camera.rotation.toVector3().getComponent(i)-rotationFinal[i])*DEFAULT_ROTATION_CAMERA_SPEED;
	}
}

/**
 * Save the direction of the movement in an array
 **/
function getMovementWay() {
	for(var i=ABSCISSA.length;i--;) {
		movements[i] = camera.position.getComponent(i)>positionFinal[i] ? -1 : 1;	
		rotation[i] = camera.rotation.toVector3().getComponent(i)>rotationFinal[i] ? -1 : 1;
	}
}

/**
 * move the camera to the start of the application
 */
function backToStart() {
	positionFinal[0] = CAMERA_START_POSITION_X;
	positionFinal[1] = CAMERA_START_POSITION_Y;
	positionFinal[2] = CAMERA_START_POSITION_Z;
	rotationFinal[0] = CAMERA_START_ROTATION_X;
	rotationFinal[1] = CAMERA_START_ROTATION_Y;
	rotationFinal[2] = CAMERA_START_ROTATION_Z;
	for(var i=groupScene.length;i--;) {
		groupScene[i]["lock"] = false;
	}
	zoomOn = null;
	zoomIn = false;
	getSpeedMovement();
	getMovementWay();
	movementCamera = true;
}

/**
*============================================================================================>
* Events
*============================================================================================> 
**/

/**
* I catch the mouse positionwhen the user move it
**/
function onDocumentMouseMove(event) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

/**
* Catch the vent when the user click on the board
**/
function onDocumentMouseDown( event ) {
	raycaster.setFromCamera( mouse, camera );
	intersects = raycaster.intersectObjects( objectInteraction, true );	
	
	if(!movementCamera && intersects.length>0) {
		// If the user is interacting with the back button
		if(intersects[0].object==childrens[1]) {
			backToStart();
			return true;
		}
		
		// If the user is interacting with the visit button
		if(intersects[0].object==childrens[0]) {
			window.open(parent["url"]);
			return true;
		}
		
		// If I'm on a board, I move to the new position
		if(parent!=null && !parent["lock"]) {
			framerate = 1000 / 60;
			for(var i=ABSCISSA.length;i--;) {
				positionFinal[i] = parent["translation"+ABSCISSA[i]];
				rotationFinal[i] = parent["rotation"+ABSCISSA[i]];
				positionReached[i] = false;
			}
			zoomOn = parent;
			zoomIn = true;
			getSpeedMovement();
			getMovementWay();
			movementCamera = true;
			parent["lock"] = true;
			return true;
		}
	}
}


/**
* We resize the entire windows when the user play with it's browser
**/			
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

init();
animate();