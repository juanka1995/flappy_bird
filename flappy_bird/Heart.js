
class Heart extends THREE.Object3D {
    constructor(size_, position_){
        super();

        this.size_ = size_;
        this.position_ = position_;

        var heart = this;
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('./obj/heart/');
        mtlLoader.load('12190_Heart_v1_L3.mtl', function (materials) {
    
            materials.preload();
    
            // Una vez cargada la textura, se carga el objeto
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('./obj/heart/');
            objLoader.load('12190_Heart_v1_L3.obj', function (object) {
                
                object.applyMatrix(new THREE.Matrix4().makeScale(size_, size_, size_));
                object.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
                object.applyMatrix(new THREE.Matrix4().makeTranslation(position_.x, position_.y, position_.z));
                heart.add(object);
            },
            function (xhr){
              console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function (error){
              console.log( 'Ocurrió un error al cargar el modelo' );
            });
        });
    }

    getPosition(){
        return this.position_;
    }

    getSize(){
        return this.size_;
    }
}