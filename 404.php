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
			var camera, scene, renderer;
			var mesh;
			init();
			animate();
			function init() {
				
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
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

				var extrudeSettings = { amount: 2, bevelEnabled: true, bevelSegments: 10, steps: 2, bevelSize: 3, bevelThickness: 3 };

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
				var leftrightboardmaterial = new THREE.MeshPhongMaterial( { color: 0xffffff } );
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
				var texture = new THREE.TextureLoader().load( 'imgs/frame1.jpg' );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				var middleboardmesh =  new THREE.Mesh( new THREE.BoxBufferGeometry( 100, 70, 1 ), material );			
				middleboardmesh.position.set( -10, 50, 2 );
				board.add( middleboardmesh );

				//board.rotation.set(0.5,0.5,0);

	            var dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
	            dirLight.position.set(0, 0, 400);
	            board.add(dirLight);
				
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
				renderer.render( scene, camera );
			}
		</script>

	</body>
</html>