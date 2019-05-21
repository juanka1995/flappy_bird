class Pico extends THREE.Mesh {
  constructor(posY,tipo) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.tipo = tipo;
    this.y=1;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (this.y,this.y/4,this.y);
    this.geometry.translate(this.y/2, 0 , 0);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    if(tipo == "upperLip"){
      this.material = new THREE.MeshPhongMaterial({color: 0xffa726});
      this.position.set (3.4-this.y/2+0.1,8.5,0);
    }
    else if (tipo == "lowerLip"){
      this.material = new THREE.MeshPhongMaterial({color: 0xFFD290});
      this.position.set (3.4-this.y/2+0.1,8.25,0);
    }

    this.posY = posY;

  }

  getPosY(){
    return this.y;
  }
  getPosX(){
    return this.y;
  }
}