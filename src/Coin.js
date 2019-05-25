
class Coin extends THREE.Mesh {
    constructor(){
        super();

        // Geometria de la moneda
        var ringGeometry = new THREE.TorusGeometry(
            2.5, 0.25, 8, 64
        );
        var cylinderGeometry  = new THREE.CylinderGeometry(
            2.5, 2.5, 0.45, 16
        );
        cylinderGeometry.rotateX(Math.PI / 2);
        var combinedGeometry = new THREE.Geometry();
        combinedGeometry.merge(ringGeometry);
        combinedGeometry.merge(cylinderGeometry);
        combinedGeometry.applyMatrix(new THREE.Matrix4().makeScale(0.17, 0.17, 0.17));
        combinedGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

        var objectMaterial = new THREE.MeshStandardMaterial({
            color: 0xffbf00,
            roughness: 0.5,
            metalness: 0.4
        });

        this.geometry = combinedGeometry;
        this.material = objectMaterial;
    }
}