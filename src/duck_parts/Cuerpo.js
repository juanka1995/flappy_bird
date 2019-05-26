
class Cuerpo extends THREE.Mesh {
  constructor(posY) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.y=4;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (this.y,this.y,this.y);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshBasicMaterial({color: 0xe68a00});
    this.geometry.translate(0, this.y/2, 0);
    this.posY = posY;
    this.position.set (0,this.posY,0);
  }

  getPosY(){
    return this.y;
  }

  getPosX(){
    return this.y;
  }
}