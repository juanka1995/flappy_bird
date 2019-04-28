
class Pie extends THREE.Mesh {
  constructor(posZ) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    
    // Un Mesh se compone de geometría y material
    this.y = 0.5;
    this.geometry = new THREE.BoxGeometry (2,this.y,2);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshPhongMaterial({color: 0xffa726});
    this.geometry.translate(1, 0.25, 0);
    this.posZ = posZ;
    this.position.set (0,0,this.posZ);
  }

  getPosY(){
    return this.y;
  }
  
  
}