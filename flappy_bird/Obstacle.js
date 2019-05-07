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

    // Obstacle position
    this.min = this.lowerBound + width_window*respect_space;
    this.max = this.upperBound - width_window*respect_space;
    this.calculateNewCenter();
    this.max_rigth_pos = this.rightBound + 2;
    this.max_left_pos = this.leftBound - 2;
    this.isOnTheMiddle = false;
    
    // Obstacle space to player can pass
    this.space_y = 3;

    // Movement increase
    this.speed = 0.1;

    // Objeto pipeline
    this.upper_pipeline = new Pipeline(true);
    this.lower_pipeline = new Pipeline(false);
    this.lower_pipeline.position.y = this.lowerBound;
    this.upper_pipeline.position.y = this.upperBound;

    this.obstacle = new THREE.Object3D();
    this.obstacle.add(this.upper_pipeline);
    this.obstacle.add(this.lower_pipeline);
    this.obstacle.position.x = this.max_rigth_pos;
    this.add(this.obstacle);
    
    // Draw center obstacle
    // var cube_geometry = new THREE.BoxGeometry (0.1,0.1,0);
    // var cube_material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    // this.cube_center = new THREE.Mesh(cube_geometry, cube_material);
    // this.cube_center.position.x = this.max_rigth_pos;
    // this.add(this.cube_center);
    
    // Generate de first obstacle position
    this.generateNewObstaclePosition();
  }
    
  generateNewObstaclePosition(){
    this.upper_pipeline.updatePipelineHigger(this.upperBound - this.center_y - this.space_y/2);
    this.lower_pipeline.updatePipelineHigger(this.center_y - this.lowerBound - this.space_y/2);


    // this.cube_center.position.y = this.center_y;
  }

  calculateNewCenter(){
    this.center_y = this.min + Math.random() * (Math.abs(this.min)+this.max);
  }

  getUpperObstacleBound(){
    return this.upperBound - this.upper_pipeline.getSizeY() - 0.1;
  }

  getLowerObstacleBound(){
    return this.lowerBound + this.lower_pipeline.getSizeY() + 0.15;
  }
  
  getXPosition(){
    return this.obstacle.position.x;
  }

  getMaxLeftPos(){
    return this.max_left_pos;
  }

  getMaxRigthPos(){
    return this.max_rigth_pos;
  }

  getIsOnTheMiddle(){
    return this.isOnTheMiddle;
  }

  getObstacleCenter(){
    return this.center_y;
  }

  updateMovement () {
    if(this.obstacle.position.x < this.max_left_pos){
      this.calculateNewCenter();
      this.obstacle.position.x = this.max_rigth_pos;
      // this.cube_center.position.x = this.max_rigth_pos;
      this.generateNewObstaclePosition();
    }
    else{
      this.obstacle.position.x -= this.speed;
      // this.cube_center.position.x -= this.speed;
      if(this.obstacle.position.x <= 0 && !this.isOnTheMiddle){
        this.isOnTheMiddle = true;
      }
    }
  }

}