
class Heart extends THREE.Object3D {
    constructor(p_position = new THREE.Vector3(-12.5, 6.5, 0), p_size = 1){
        super();

        this.size_ = p_size;
        this.position_ = p_position;

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
        geometry.applyMatrix(new THREE.Matrix4().makeScale(0.05, 0.05, 0.05));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0.5));
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        var mesh = new THREE.Mesh(geometry, material) ;
        this.add(mesh);
        this.position.x += this.position_.x;
        this.position.y += this.position_.y;
        this.position.z += this.position_.z;
        this.scale.set(this.size_, this.size_, this.size_);
    }

    // Devuelve una copia de la posición actual del corazon
    getPosition(){
        return this.position_.clone();
    }

    // Devuelve el tamaño escalado actual del corazon
    getSize(){
        return this.size_;
    }

    // Actualiza la posición del eje X del corazon
    updateXPosition(new_x_position){
        this.position_.x = new_x_position;
        this.position.x = this.position_.x;
    }
}