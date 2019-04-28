
class Pata extends THREE.Mesh {
  constructor(posZ,posY) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.y=3;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (0.3,this.y,0.3);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshPhongMaterial({color: 0xffa726});
    this.geometry.translate(0, this.y/2, 0);
    this.posZ = posZ;
    this.posY = posY;
    this.position.set (0,this.posY,this.posZ);
  }

  getPosY(){
    return this.y;
  }
}
