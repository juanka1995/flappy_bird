 class Obstacle extends THREE.Mesh {
  constructor() {
    super();

    // Limites superior e inferior
    this.upperBound = 8.1;
    this.lowerBound = -5.15;
    this.rightBound = 13.65;
    this.leftBound = -13.65;
    var width_window = this.upperBound - this.lowerBound;
    var respect_space = 0.3;

    // Posicion del obstaculo
    this.min = this.lowerBound + width_window*respect_space;
    this.max = this.upperBound - width_window*respect_space;
    this.calculateNewCenter();
    this.max_rigth_pos = this.rightBound + 2;
    this.max_left_pos = this.leftBound - 2;
    this.isOnTheMiddle = false;
    
    // Espacio entre la tubería de arriba y la de abajo del obstaculo
    this.space_y = 3;

    // Incremento de velocidad del obstaculo
    this.speed = 0.1;

    // Objetos tuberias que forman un obstaculo
    this.upper_pipeline = new Pipeline(true);
    this.lower_pipeline = new Pipeline(false);
    this.lower_pipeline.position.y = this.lowerBound;
    this.upper_pipeline.position.y = this.upperBound;

    this.obstacle = new THREE.Object3D();
    this.obstacle.add(this.upper_pipeline);
    this.obstacle.add(this.lower_pipeline);
    this.obstacle.position.x = this.max_rigth_pos;
    this.add(this.obstacle);
    
    // Generamos la posición inicial del obstaculo
    this.generateNewObstaclePosition();
  }
    
  // Función que posiciona el obstaculo (tubería de arriba y de abajo) en la nueva posición
  generateNewObstaclePosition(){
    this.upper_pipeline.updatePipelineHigger(this.upperBound - this.center_y - this.space_y/2);
    this.lower_pipeline.updatePipelineHigger(this.center_y - this.lowerBound - this.space_y/2);
  }

  // Función que calcula el nuevo centro del obstaculo de forma aleatoria
  calculateNewCenter(){
    this.center_y = this.min + Math.random() * (Math.abs(this.min)+this.max);
  }

  // Funcion que devuelve el limite de la tuberia superior
  getUpperObstacleBound(){
    return this.upperBound - this.upper_pipeline.getSizeY() - 0.1;
  }

  // Funcion que devuelve el limite de la tuberia inferior
  getLowerObstacleBound(){
    return this.lowerBound + this.lower_pipeline.getSizeY() -0.1;
  }
  
  // Devuelve la coordenada X del obstaculo
  getXPosition(){
    return this.obstacle.position.x;
  }

  // Devuelve el límite izquierdo hasta el que puede llegar el obstaculo
  getMaxLeftPos(){
    return this.max_left_pos;
  }

  // Devuelve el límite derecho hasta el que puede llegar el obstaculo
  getMaxRigthPos(){
    return this.max_rigth_pos;
  }

  // Devuelve si el obstaculo ya ha pasado por el centro de la pantalla
  getIsOnTheMiddle(){
    return this.isOnTheMiddle;
  }

  // Devuelve el centro del obstaculo calculado aleatoriamente
  getObstacleCenter(){
    return this.center_y;
  }

  // Devuelve como de ancho es el obstaculo
  getWidthObstacle(){
    return this.upper_pipeline.getWidth();
  }

  // Actualiza el movimiento de la tubería
  updateMovement () {
    // Si el obstaculo ha superado el limite izquierdo se resetea
    if(this.obstacle.position.x < this.max_left_pos){
      this.calculateNewCenter();
      this.obstacle.position.x = this.max_rigth_pos;
      this.generateNewObstaclePosition();
    }
    // En caso contrario avanza de forma progresiva hacia la izquierda
    else{
      this.obstacle.position.x -= this.speed;
      if(this.obstacle.position.x <= 0 && !this.isOnTheMiddle){
        this.isOnTheMiddle = true;
      }
    }
  }

  // Devuelve las cajas de colision del obstaculo (tuberia superior e inferior)
  getBoxes(){
    return [this.upper_pipeline.getBox(),this.lower_pipeline.getBox()];
  }

}