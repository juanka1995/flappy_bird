class Papada extends THREE.Mesh {
  constructor(posY) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.y=0.5;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (this.y,this.y+0.1,this.y);
    this.geometry.translate(this.y/2,0, 0);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshBasicMaterial({color: 0xA30000});
    this.position.set (3.25-this.y/2,7.8,0);

    this.posY = posY;

  }

  getPosY(){
    return this.y;
  }
  getPosX(){
    return this.y;
  }
}