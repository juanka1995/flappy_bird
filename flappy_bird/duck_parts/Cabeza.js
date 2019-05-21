
class Cabeza extends THREE.Mesh {
  constructor(posX,posY) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.y=2;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (this.y,this.y,this.y);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
    this.geometry.translate(0, this.y/2, 0);
    this.posX = posX;
    this.posY = posY;
    this.position.set (this.posX,this.posY,0);
  }

  getPosY(){
    return this.y;
  }
  getPosX(){
    return this.y;
  }
}