
class Heart extends THREE.Object3D {
    constructor(p_position = new THREE.Vector3(-12.5, 6.5, 0), p_size = 1){
        super();

        this.size_ = p_size;
        this.position_ = p_position;

        var x = 0, y = 0;
        var heartShape = new THREE.Shape();
        heartShape.moveTo( x + 5, y + 5 );
        heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

        var geometry = new THREE.ShapeBufferGeometry(heartShape);
        geometry.applyMatrix(new THREE.Matrix4().makeScale(0.035, 0.035, 0.035));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI));
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0.25, 1, 0.5));
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