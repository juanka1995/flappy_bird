 
class Pipeline extends THREE.Mesh {
  constructor(isLower) {
    super();
    // Booleano encargado de definir si es una tubería superior o inferior
    this.isLower = isLower;

    // Parte de abajo
    this.size_y_down_part = 2.3;
    this.width_down_part = 1.7;
    var down_geometry = new THREE.BoxGeometry (this.width_down_part, this.size_y_down_part, 0);
    var down_texture = new THREE.TextureLoader().load('imgs/pipeline_texture.jpg');
    var down_material = new THREE.MeshBasicMaterial ({map: down_texture});
    this.down_part = new THREE.Mesh(down_geometry, down_material);
    this.down_part.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1.15, 0));

    // Parte de arriba
    this.size_y_up_part = 1.3;
    this.width_up_part = 2.3;
    var up_geometry = new THREE.BoxGeometry (this.width_up_part, this.size_y_up_part, 0);
    var up_texture = new THREE.TextureLoader().load('imgs/pipeline_texture.jpg');
    var up_material = new THREE.MeshBasicMaterial ({map: up_texture});
    this.up_part = new THREE.Mesh(up_geometry, up_material);
    this.up_part.position.y = 2.9;

    // Objeto tubería
    this.pipeline = new THREE.Object3D();
    this.pipeline.add(this.up_part);
    this.pipeline.add(this.down_part);
    // Tuberia del suelo o del techo
    if(this.isLower){
      this.pipeline.rotateZ(Math.PI);
    }
    this.add(this.pipeline);

    // Caja de colisión para la tubería
    this.box = new THREE.Box3();
  }

  // Función encargada de poner el largo de la tubería al tamaño pasado por parametro
  updatePipelineHigger(size_y){
    var scale_factor = (size_y-this.size_y_up_part)/this.size_y_down_part;
    this.size_y_down_part *= scale_factor;
    this.down_part.geometry.applyMatrix(new THREE.Matrix4().makeScale(1, scale_factor, 1));
    this.up_part.position.y = this.size_y_down_part + 0.5;
  }

  // Devuelve la altura total de la tubería
  getSizeY(){
    return this.size_y_down_part + this.size_y_up_part;
  }

  // Devuelve el ancho medio de la tubería
  getWidth(){
    return (this.width_down_part + this.width_up_part) / 2;
  }

  // Devuelve la caja de colisión de la tubería
  getBox(){
    return this.box.setFromObject(this);
  }

}