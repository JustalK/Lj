<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - geometry - cube</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				margin: 0px;
				background-color: #000000;
				overflow: hidden;
			}
		</style>
	</head>
	<body>

		<script src="./framework/three.js"></script>

		<script>

			Math.radians = function(degrees) {
				  return degrees * Math.PI / 180;
			};
			 
			// Converts from radians to degrees.
			Math.degrees = function(radians) {
			  return radians * 180 / Math.PI;
			};
		
			var camera, scene, renderer, board;
			var mesh;
			init();
			animate();

			/* Constants */
			var SPEED = 1;
			
			function init() {
				
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				// Position of the camera
				camera.position.set(0,0,400);

				
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );
				var light = new THREE.PointLight( 0xffffff, 0.8 );
				light.position.set( 0, 0, 0 );
				//camera.add( light );

	            var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.3 );
	            hemiLight.color = new THREE.Color( 0xf0f0f0 );
	            hemiLight.groundColor = new THREE.Color( 0xf0f0f0 );
	            hemiLight.position.set( 0, 0, 1000 );
	            //scene.add(hemiLight);
				

				var ambLight = new THREE.AmbientLight(0x404040);
				scene.add(ambLight);
				
				var geometry = new THREE.BoxBufferGeometry( 100, 200, 0 );
				mesh = new THREE.Mesh( geometry, material );

				var extrudeSettings = { amount: 10, bevelEnabled: true, bevelSegments: 1, steps: 2, bevelSize: 3, bevelThickness: 3 };

				// The mesh of thge board, it has been done with the different mesh that I'm gonna create there
				board = new THREE.Group();
				// Create the board with the point
				var leftboard = new THREE.Shape();
				leftboard.moveTo( 0, 0 );
				leftboard.lineTo( 0, 20 );
				leftboard.lineTo( 10, 30 );
				leftboard.lineTo( 10, 70 );
				leftboard.lineTo( 0, 80 );
				leftboard.lineTo( 0, 100 );
				leftboard.lineTo( 40, 90 );
				leftboard.lineTo( 40, 80 );
				leftboard.lineTo( 20, 80 );
				leftboard.lineTo( 20, 20 );
				leftboard.lineTo( 40, 20 );
				leftboard.lineTo( 40, 10 );
				// The left part of the board
				var texture = new THREE.TextureLoader().load( 'textures/dark4.jpg' );
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set( 0.008, 0.008 );
				var leftrightboardmaterial = new THREE.MeshPhongMaterial( {  map: texture } );
				var leftboardgeometry = new THREE.ExtrudeGeometry( leftboard, extrudeSettings );
				var leftboardmesh = new THREE.Mesh( leftboardgeometry, leftrightboardmaterial );
				leftboardmesh.position.set( -80, 0, 0 );
				leftboardmesh.rotation.set( 0, 0, 0 );
				board.add( leftboardmesh );
				// The right part of the board, I made by using the left part
				var rightboardmesh = new THREE.Mesh( leftboardgeometry, leftrightboardmaterial );
				rightboardmesh.rotation.set( 0, Math.PI, 0 );				
				rightboardmesh.position.set( 60, 0, 2 );
				board.add( rightboardmesh );
				// The middle part of the board, it's there where I'm gonna show the content
				var texture = new THREE.TextureLoader().load( 'imgs/frame1_LOW.jpg' );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				var middleboardmesh =  new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 70, 1 ), material );			
				middleboardmesh.position.set( -10, 50, -4 );
				board.add( middleboardmesh );

			    // wireframe for the left side
			    var mat = new THREE.LineBasicMaterial( { color: 0x60A8D6, linewidth: 1 } );
			    var leftboardwireframe = new THREE.LineSegments( new THREE.EdgesGeometry( leftboardmesh.geometry ), mat );
			    leftboardwireframe.position.set( -80, 0, 0 );
				board.add( leftboardwireframe );
				//Wireframe for the right side
			    var rightboardwireframe = new THREE.LineSegments( new THREE.EdgesGeometry( leftboardmesh.geometry ), mat );
			    rightboardwireframe.rotation.set( 0, Math.PI, 0 );				
			    rightboardwireframe.position.set( 60, 0, 2 );
				board.add( rightboardwireframe );				
				
				// Light only for one board
	            var dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
	            dirLight.position.set(0, 0, 400);
	            board.add(dirLight);

				//board.rotation.set(0.5,0.5,0);
				
				// Position the elements
				board.position.set(0,-30,450);
				board.rotation.set(Math.radians(10),Math.radians(70),Math.radians(10));
				
				scene.add( board );				

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );

				// If the board is not at it's original position
				if(board.position.z>0) {
					board.position.set(0,-30,parseInt(board.position.z)-1);
				}
				if(board.position.y>0) {
					board.position.set(0,parseInt(board.position.y)-1,board.position.z);
				}
				
				renderer.render( scene, camera );
				
			}
		</script>

	</body>
</html>