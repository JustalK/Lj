/**
*============================================================================================>
* Util function 
*============================================================================================> 
**/
Math.radians = function(degrees) {
	  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

/**
*============================================================================================>
* Constant and variables 
*============================================================================================> 
**/

/** The Three Camera **/
var camera;
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
// The final position of our camera
var positionFinal = [0,0,0];
// The final rotation of our camera
var rotationFinal = [0,0,0];
// Check if the position is reached on all abscisse
var positionReached = [false,false,false];
// The speed of the camera when it's translating to a new position
var speedTranslation = [0,0,0];
// The speed of the camera when it's rotating to a new position
var speedRotation = [0,0,0];

/* Constants */
var SPEED = 1;
var TIME = 0;
var BACKGROUND_COLOR = 0x000000;
var LIGHT_AMBIANT_COLOR = 0x404040;
var WIREFRAME_COLOR = 0x60A8D6;
var CAMERA_START_POSITION_X = 0;
var CAMERA_START_POSITION_Y = 0;
var CAMERA_START_POSITION_Z = 2000;
var CAMERA_START_ROTATION_X = 0;
var CAMERA_START_ROTATION_Y = 0;
var CAMERA_START_ROTATION_Z = 0;
var TEXTURE_BOARD_EXTREMITY = "textures/dark4.jpg";
var TEXTURE_BUTTON_BACK = 'imgs/back.png';
var TEXTURE_BUTTON_VISIT = 'imgs/visit.png';
var DEFAULT_MOVEMENT_CAMERA_SPEED = 1;
var FOG_POWER = 0.0007;
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

	createSmoke(300,'./textures/smoke.png',0x155CA3,0,500,100,600);
	createSmoke(500,'./textures/smoke.png',0x001966,800,500,100,360);		
	
	groupScene.push(createBoard('imgs/frame1_LOW.jpg','imgs/test.png',-100,-20,1200,0,0,0,-100,-20,1600,0,0,0));

	for(i=0;i<groupScene.length;i++) {
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
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
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
	scene.add(new THREE.AmbientLight(color));
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
* Creating the object
*============================================================================================> 
**/

/**
* Create a board in the scene
* @param string textureCenter The texture of the center of the board 
* @param int x The position X of the object
* @param int y The position Y of the object
* @param int z The position Z of the object
* @param int rx The rotation X of the object
* @param int ry The rotation Y of the object
* @param int rz The rotation Z of the object
* @return One board with all his pieces
**/
function createBoard(textureCenter,textureInformations,x,y,z,rx,ry,rz,translationX,translationY,translationZ,rotationX,rotationY,rotationZ) {
	// The mesh of thge board, it has been done with the different mesh that I'm gonna create there
	boardTmp = new THREE.Group();

	// Construct the mesh piece by piece
	piece = [];
	piece.push(createSideBoard(-80,0,0,0,0,0));
	piece.push(createSideBoard(60,0,10,0,Math.PI,0));	
	piece.push(createSideWireframe(-80,0,0,0,0,0));
	piece.push(createSideWireframe(60,0,10,0,Math.PI,0));
	piece.push(createCenterWireframe(-10,50,4,0,0,0));
	piece.push(createCenterBoard(textureCenter,-10,50,4));
	piece.push(createPanel(textureInformations,140, 40, 1,-10,110,8));
	piece.push(createPanel(TEXTURE_BUTTON_BACK,40, 20, 1,20,-10,8));
	piece.push(createPanel(TEXTURE_BUTTON_VISIT,40, 20, 1,-40,-10,8));

	// Add the differents parts to the group of meshes
	for(i=0;i<piece.length;i++) {
		boardTmp.add(piece[i]);
	}

	// Add each mesh to the objectInteract for letting the user play with them
	for(i=0;i<piece.length;i++) {
		objectInteraction.push(piece[i]);
	}


	
	// Value for the perpetual movement
	boardTmp["ascending"] = true;
	boardTmp["translationX"] = translationX;
	boardTmp["translationY"] = translationY;
	boardTmp["translationZ"] = translationZ;
	boardTmp["rotationX"] = rotationX;
	boardTmp["rotationY"] = rotationY;
	boardTmp["rotationZ"] = rotationZ;

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
	leftShape.moveTo( 0, 0 );
	leftShape.lineTo( 0, 20 );
	leftShape.lineTo( 10, 30 );
	leftShape.lineTo( 10, 70 );
	leftShape.lineTo( 0, 80 );
	leftShape.lineTo( 0, 100 );
	leftShape.lineTo( 40, 90 );
	leftShape.lineTo( 40, 80 );
	leftShape.lineTo( 20, 80 );
	leftShape.lineTo( 20, 20 );
	leftShape.lineTo( 40, 20 );
	leftShape.lineTo( 40, 10 );
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
	texture.repeat.set(0.008, 0.008);
	
	materialBoard = new THREE.MeshPhongMaterial( {  color:WIREFRAME_COLOR,wireframe:true } );
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
	centerMesh =  new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 70, 1 ),  [0,0,0,0,material,0] );
	centerMesh.position.set(x,y,z);
	return centerMesh;
}

/**
* Create a panel on the board
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
	texture = new THREE.TextureLoader().load( texture );
	material = new THREE.MeshBasicMaterial( { map: texture, transparent: true } );
	informationsMesh =  new THREE.Mesh( new THREE.BoxBufferGeometry( sx, sy, sz ), [0,0,0,0,material,0] );
	informationsMesh.position.set(x,y,z);
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
	geometryBoard = new THREE.BoxBufferGeometry( 100, 70, 1 );
	material = new THREE.LineBasicMaterial( { color: WIREFRAME_COLOR, linewidth: 1 } );
	sideWireframe = new THREE.LineSegments( new THREE.EdgesGeometry( geometryBoard ), material );
	sideWireframe["wireframe"] = true;
	sideWireframe.position.set( x, y, z );
	sideWireframe.rotation.set( rx, ry, rz );
	return sideWireframe;
}

/**
* Create a nice effect with smoke
* @param int numbers The number of particle
* @param string texture The texture for the smoke (png)
* @param string color The color of the smoke
* @param int x The position X of the smoke
* @param int y The position Y of the smoke
* @param int z The position Z of the smoke
* @param int rz The rotation of the smoke
**/
function createSmoke(numbers,texture,color,x,y,z,rz) {
	smokeTexture = THREE.ImageUtils.loadTexture(texture);
    smokeMaterial = new THREE.MeshLambertMaterial({color: color, map: smokeTexture, transparent: true});
    smokeGeo = new THREE.PlaneGeometry(300,300);

    for (p = 0; p < numbers; p++) {
        var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
        positionX = Math.random()*1000-x;
        positionY = Math.random()*1000-y;
        positionY = positionY<300 && positionY>-300 && positionX<100 ? positionY-500 : positionY; 
	        
        particle.position.set(positionX,positionY,Math.random()*2000-z);
        particle.rotation.z = Math.random() * rz;
        scene.add(particle);
        smokeParticles.push(particle);
    }			
}

/**
*============================================================================================>
* Animations
*============================================================================================> 
**/

var parent = null;
var childrens = null;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	TIME++;
	
	// If the board is not at it's original position
	// We move the different object for a beautiful aniamtion
	//movement(groupScene[0],0,100,0,0,-1,-0.002,0,0);
	//movement(groupScene[0],100,300,0,0.1,-1,0,0,0);
	
	delta = clock.getDelta();
	moveSmoke();

	for(i=0;i<groupScene.length;i++) {
		perpetual(groupScene[i],300);
	}

	// If I'm on a movement, I cannot change the parent, so the raycaster is not usefull
	if(movementCamera && parent!=null) {
		// If I have not reached the final position on each abcisse
		if(!(positionReached[0] && positionReached[1] && positionReached[2])) {
			moveCameraToBoard();
		}
	} else {
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( mouse, camera );
		// Permet de recuperer l'ensemble des objects avec lequels on peux interajir
		var intersects = raycaster.intersectObjects( objectInteraction, true );			
		
		if(intersects.length>0) {
			if(parent==null || parent!=intersects[0].object.parent) {
				document.body.style.cursor = "pointer";
				parent = intersects[0].object.parent;
				childrens = parent.children;
				for(i=0;i<childrens.length;i++) {
					if(childrens[i]["wireframe"]) {
						childrens[i].material.color = new THREE.Color(0xFFFFFF);
					}
				}
			}
		} else {
			document.body.style.cursor = "inherit";
			for(i=0;childrens!=null && i<childrens.length;i++) {
				if(childrens[i]["wireframe"]) {
					childrens[i].material.color = new THREE.Color(0x081D2F);
				}
			}
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
* Move the smoke particule - in fact they jus rotate arount Z
**/
function moveSmoke() {
    var sp = smokeParticles.length;
    while(sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.1);
    }
}

// Move an object only if the period of time is between start and end
// x,y,z is for make a translation and rotx,roty,rotz is for a rotation
function movement(board,start,end,x,y,z,rotx,roty,rotz) {
	// If it's the moment to move the board
	if(start<=TIME && TIME<=end) {
		board.translateX(x);
		board.translateY(y);
		board.translateZ(z);
		board.rotateX(rotx);
		board.rotateY(roty);
		board.rotateZ(rotz);
	}
}

// Make the object moving without stopping
function perpetual(board,start) {
	if(start<=TIME) {
		if(board.ascending) {
			board.rotateY(0.002);
			board.rotateX(0.001);
			if(board.rotation.y>=Math.radians(20)) {
				board["ascending"] = false; 
			}
		} else {
			board.rotateY(-0.002);
			board.rotateX(-0.001);
			if(board.rotation.y<=Math.radians(0)) {
				board["ascending"] = true;
			}
		}
	}
}

/**
* Move the camera to a new position
**/
function moveCameraToBoard() {
	for(i=0;i<movements.length;i++) {
		if(isMoveCameraTo(movements[i],camera.position.getComponent(i),positionFinal[i])) {
			add = delta * movements[i] * speedTranslation[i];
			camera.position.setComponent(i,camera.position.getComponent(i) + add);
		} else {
			positionReached[i] = true;
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
	for(i=0;i<movements.length;i++) {
		speedTranslation[i] = Math.abs(camera.position.getComponent(i)-positionFinal[i])*DEFAULT_MOVEMENT_CAMERA_SPEED;
	}
}

/**
 * Save the direction of the movement in an array
 **/
function getMovementWay() {
	for(i=0;i<movements.length;i++) {
		movements[i] = camera.position.getComponent(i)>positionFinal[i] ? -1 : 1;	
	}
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
	// If I'm on a board, I move to the new position
	if(parent!=null && !movementCamera) {
		positionFinal[0] = parent["translationX"];
		positionFinal[1] = parent["translationY"];
		positionFinal[2] = parent["translationZ"];
		rotationFinal[0] = parent["rotationX"];
		rotationFinal[1] = parent["rotationY"];
		rotationFinal[2] = parent["rotationZ"];
		positionReached[0] = false;
		positionReached[1] = false;
		positionReached[2] = false;
		getSpeedMovement();
		getMovementWay();
		movementCamera = true;
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