// ======================================================================================================================>
// ======================================================================================================================>
// ======================================================================================================================>
// ======================================================================================================================>

describe("Test the calculations of the direction of the movement", function() {	
    it("from 3000,0,0 to 0,0,0", function() {
    	// Initialization of the movement at 0,0,0
    	expect(movements[0]).toEqual(0);
    	expect(movements[1]).toEqual(0);
    	expect(movements[2]).toEqual(0);
    	// Creating a place to move and setting the camera
    	camera.position.set(3000,0,0);
    	positionFinal = [0,0,0];
    	getMovementWay();
    	expect(movements[0]).toEqual(-1);
    	expect(movements[1]).toEqual(1);
    	expect(movements[2]).toEqual(1);
    }); 
    
    it("from -125,560,-56 to -14,1200,89", function() {
    	// Creating a place to move and setting the camera
    	camera.position.set(-125,560,-56);
    	positionFinal = [-14,1200,89];
    	getMovementWay();
    	expect(movements[0]).toEqual(1);
    	expect(movements[1]).toEqual(1);
    	expect(movements[2]).toEqual(1);
    });   
    
    it("from -15,560,-1568 to -489,56,-12", function() {
    	// Creating a place to move and setting the camera
    	camera.position.set(-15,560,-1568);
    	positionFinal = [-489,56,-12];
    	getMovementWay();
    	expect(movements[0]).toEqual(-1);
    	expect(movements[1]).toEqual(-1);
    	expect(movements[2]).toEqual(1);
    });  
    
    it("from 0,0,0 to 0,0,0", function() {
    	// Creating a place to move and setting the camera
    	camera.position.set(0,0,0);
    	positionFinal = [0,0,0];
    	getMovementWay();
    	expect(movements[0]).toEqual(1);
    	expect(movements[1]).toEqual(1);
    	expect(movements[2]).toEqual(1);
    }); 
});

//======================================================================================================================>
//======================================================================================================================>
//======================================================================================================================>
//======================================================================================================================>


describe("Test the calculations of the movement's speed", function() {	
	it("0 step", function() {
		camera.position.set(0,0,0);
		positionFinal = [0,0,0];
    	expect(speedTranslation).toEqual([0,0,0]);
    	expect(speedRotation).toEqual([0,0,0]);
	});
	it("10 steps", function() {
		camera.position.set(20,0,0);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 10;
		positionFinal = [0,0,0];
		getSpeedMovement();
    	expect(speedTranslation).toEqual([200,0,0]);
	});
	it("10 steps with some others steps under", function() {
		camera.position.set(10,20,5);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 10;
		positionFinal = [0,0,0];
		getSpeedMovement();
    	expect(speedTranslation).toEqual([100,200,50]);
	});
	it("10 steps with differences", function() {
		camera.position.set(10,5,5);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 10;
		positionFinal = [-10,5,0];
		getSpeedMovement();
    	expect(speedTranslation).toEqual([200,0,50]);
	});
	it("10 steps in negative", function() {
		camera.position.set(-10,0,0);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 10;
		positionFinal = [-30,0,0];
		getSpeedMovement();
    	expect(speedTranslation).toEqual([200,0,0]);
	});
	it("10 steps in negative and positive", function() {
		camera.position.set(-10,0,0);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 10;
		positionFinal = [10,0,0];
		getSpeedMovement();
		expect(speedTranslation).toEqual([200,0,0]);
	});
	it("10 steps in positive and negative", function() {
		camera.position.set(10,0,0);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 10;
		positionFinal = [-10,0,0];
		getSpeedMovement();
		expect(speedTranslation).toEqual([200,0,0]);
	});
	it("20 steps", function() {
		camera.position.set(20,0,0);
		DEFAULT_MOVEMENT_CAMERA_SPEED = 20;
		positionFinal = [0,0,0];
		getSpeedMovement();
		expect(speedTranslation).toEqual([400,0,0]);
	});
});

//======================================================================================================================>
//======================================================================================================================>
//======================================================================================================================>
//======================================================================================================================>

describe("Test the calculations of the rotation's speed", function() {	
	it("0 deg", function() {
		camera.rotation.set(0,0,0);
		DEFAULT_ROTATION_CAMERA_SPEED = 20;
		rotationFinal = [0,0,0];
		getSpeedMovement();
		expect(speedRotation).toEqual([0,0,0]);
	});
	it("10 deg", function() {
		camera.rotation.set(10,10,10);
		DEFAULT_ROTATION_CAMERA_SPEED = 10;
		rotationFinal = [0,0,0];
		getSpeedMovement();
		expect(speedRotation).toEqual([100,100,100]);
	});
	it("-10 deg", function() {
		camera.rotation.set(-10,-10,-10);
		DEFAULT_ROTATION_CAMERA_SPEED = 10;
		rotationFinal = [0,0,0];
		getSpeedMovement();
		expect(speedRotation).toEqual([100,100,100]);
	});
	it("from 5,-2,3 deg to 20,-6,96 deg", function() {
		camera.rotation.set(5,-2,3);
		DEFAULT_ROTATION_CAMERA_SPEED = 10;
		rotationFinal = [20,-6,96];
		getSpeedMovement();
		expect(speedRotation).toEqual([150,40,930]);
	});
});

//======================================================================================================================>
//======================================================================================================================>
//======================================================================================================================>
//======================================================================================================================>


describe("Test the test that allow the camera to move to a position", function() {	
	it("No movement", function() {
		expect(isMoveCameraTo(0,0,0)).toEqual(false);
		expect(isMoveCameraTo(1,0,0)).toEqual(false);
		expect(isMoveCameraTo(-1,0,0)).toEqual(false);
	});	
	it("Up movement expected", function() {
		expect(isMoveCameraTo(1,1,10)).toEqual(true);
	});	
	it("Down movement expected", function() {
		expect(isMoveCameraTo(-1,10,1)).toEqual(true);
	});	
});