
class Heart extends THREE.Mesh {
    constructor(){
        super();

        var heart = new THREE.Shape();
        var x = -2.5;
        var y = -5;
        heart.moveTo(x + 2.5, y + 2.5);
        heart.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        heart.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        heart.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        heart.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        heart.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        heart.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        var extrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 2,
        };

        var geometry = new THREE.ExtrudeBufferGeometry(heart, extrudeSettings);
        geometry.applyMatrix(new THREE.Matrix4().makeScale(0.07, 0.07, 0.07));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.geometry = geometry;
        this.material = material;
    }
}