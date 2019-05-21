class Leg extends THREE.Object3D {
  constructor(positionZ) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz


    this.posZ = positionZ;
    this.pieDerecho = new Pie(this.posZ);
    this.pieIzquierdo = new Pie(-this.posZ);
    this.y = this.pieDerecho.getPosY();
    this.pataDerecha = new Pata(positionZ,this.y);
    this.pataIzquierda = new Pata(-positionZ,this.y);

    this.y += this.pataDerecha.getPosY();

    this.add(this.pieDerecho);
    this.add(this.pieIzquierdo);
    this.add(this.pataDerecha);
    this.add(this.pataIzquierda);

    this.rotZ = -1.6;

  }

  getPosY(){
    return this.y;
  }

  setPataAtras(tamanioCuerpo){
    this.position.x = this.position.x - (tamanioCuerpo) -1;
    this.position.y = this.position.y + (this.pataDerecha.getPosY())+0.5;
    this.rotation.set (0,0,this.rotZ);
  }
}
