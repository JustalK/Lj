// Tests unitaire
describe("Test the randoms calculations of the direction of the movement", function() {	
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
});