class Duck extends THREE.Mesh {
  constructor() {
    super();
  
    // Geometria y material del pato
    this.geometry = new THREE.BoxGeometry (1,1,0);
    this.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

    // Limites superior e inferior
    this.upperBound = 7.6;
    this.lowerBound = -4.7;

    // Posición inicial del pato
    this.y = 0;
  }
  
  update () {
    // Descenso continuo pato
    this.y-=0.02;

    // No sobrepasar limite superior
    if(this.outOfUpperBound()){
      this.y = this.upperBound;
    }

    // No sobrepasar limite inferiro
    if(this.outOfLowerBound()){
      this.y = this.lowerBound;
    }

    // Actualizar la posición del pato
    this.position.set (0,this.y,0);    
  }

  // Comprobar posición superior pato
  outOfUpperBound(){
    return this.y >= this.upperBound;
  }

  // Comprobar posición inferior pato
  outOfLowerBound(){
    return this.y <= this.lowerBound;
  }

  // Acción de volar del pato
  fly(){
    this.y+=0.5;
    this.position.set (0,this.y,0);
  }

}