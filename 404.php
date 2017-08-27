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
				
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				// Position of the camera
				camera.position.set(0,0,400);

				
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );
				var light = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( light );
				
				var texture = new THREE.TextureLoader().load( 'imgs/crate.gif' );
				var geometry = new THREE.BoxBufferGeometry( 100, 200, 0 );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				mesh = new THREE.Mesh( geometry, material );


				var triangleShape = new THREE.Shape();
				triangleShape.moveTo( 80, 20 );
				triangleShape.lineTo( 40, 80 );
				triangleShape.lineTo( 120, 80 );
				triangleShape.lineTo( 80, 20 );
				var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
				var geometry = new THREE.ExtrudeGeometry( triangleShape, extrudeSettings );
				var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0xff3300 } ) );
				mesh.position.set( 0, 0, 100 );
				mesh.rotation.set( 0, 0, 0 );
				mesh.scale.set( 1, 1, 1 );
				scene.add( mesh );
				
				renderer = new THREE.WebGLRenderer();
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