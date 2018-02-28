// Tests unitaire
describe("Testing Two Numbers", function() {	
    it("Test the randoms calculations of the direction of the movement", function() {
    	camera.position.set(3000,0,0);
    	positionFinal = [0,0,0];
    	getMovementWay();
    	expect(movements[0]).toEqual(-1);
    	expect(movements[1]).toEqual(1);
    	expect(movements[2]).toEqual(1);
    });   
});