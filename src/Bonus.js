 class Bonus extends THREE.Object3D {
  constructor(bonus_pos, mesh) {
    super();

    // Mesh para el tipo de bonus
    this.mesh = mesh.clone();

    // Limites superior e inferior
    this.rotationY = 0;
    this.speed = 0.1;
    this.upperBound = 8.1;
    this.lowerBound = -5.15;
    this.rightBound = 13.65;
    this.leftBound = -13.65;
    this.bonusPos = bonus_pos; // Primero o segundo
    this.type = null;
    this.calculateTypeBonus();
    
    // Variables para calcular la posicion del bonus
    var width_window = this.upperBound - this.lowerBound;
    var respect_space = 0.2;
    this.min = this.lowerBound + width_window*respect_space;
    this.max = this.upperBound - width_window*respect_space;

    
    // Posicion del bonus dependiendo del parametro bonus_pos
    if(this.bonusPos == 1){
      this.x = this.leftBound/2;
    }
    else if (this.bonusPos == 2){
      this.x = this.rightBound/2;
    }
    
    // Posicion del obstaculo
    this.max_rigth_pos = this.rightBound + 2;
    this.max_left_pos = this.leftBound - 2;

    // Reseteamos y añadimos el mesh
    this.reset();
    this.add(this.mesh);

    // Colisiones
    this.box = new THREE.Box3();

    // Visibilidad desactivada por defecto
    this.visible = false;
    this.set_visible = false;
  }

  update(){
    this.position.x -= this.speed;
    if(this.position.x < this.max_left_pos){
      this.goToRightBound();
    }
  }

  // Calcula el tipo de bonus dependiendo del this.mesh
  calculateTypeBonus(){
    if(this.mesh instanceof Heart)
      this.type = "Heart";
    else
      this.type = "Coin";
  }

  // Función que posiciona el bonus
  reset(){
    this.position.set (this.x,0,0.5);
  }

  // Funcion que mueve el bonus hacia el extremo derecho
  goToRightBound(){
    this.position.set (this.max_rigth_pos,0,0.5);
    if(this.set_visible)
      this.visible = true;
  }

  // Función que devuelve la posición del bonus (primero o segundo)
  getBonusPos(){
    return this.bonusPos;
  }

  // Devuelve la posición X del bonus
  getXPosition(){
    return this.position.x;
  }

  // Función que devuelve el tipo de bonus (Heart/Coin)
  getTypeBonus(){
    return this.type;
  }

  // Función que devuelve el ancho del bonus (por defecto 0.5)
  getWidth(){
    return 0.5;
  }

  // Función que devuelve el collider
  getBox(){
    return this.box.setFromObject(this);
  }

  // Función que se encarga de cambiar el tipo de mesh del bonus
  // (Heart/Coin)
  changeMesh(new_mesh){
    this.remove(this.mesh);
    this.mesh = mesh.clone();
    this.calculateTypeBonus();
    this.add(this.mesh);
  }

  // Funciones para hacer el bonus visible el proximo reseteo o no
  setVisibleNextGoToRightBound(){
    this.set_visible = true;
  }
  unsetVisibleNextGoToRightBound(){
    this.set_visible = false;
  }

  // Función que calcula la nueva posición del bonus
  setNewObstaclePosition(){
    this.position.y = this.min + Math.random() * (Math.abs(this.min)+this.max);
  }
}