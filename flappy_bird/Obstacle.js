 class Obstacle extends THREE.Mesh {
  constructor() {
    super();

    // Limites superior e inferior
    this.upperBound = 8.1;
    this.lowerBound = -5.15;
    this.rightBound = 9.65;
    this.leftBound = -9.65;
    var width_window = this.upperBound - this.lowerBound;
    var respect_space = 0.3;

    // Obstacle position
    this.min = this.lowerBound + width_window*respect_space;
    this.max = this.upperBound - width_window*respect_space;
    this.center_y = this.calculateNewCenter();
    
    // Obstacle space to player can pass
    this.space_y = 3;

    // Objeto pipeline
    this.upper_pipeline = new Pipeline(true);
    this.lower_pipeline = new Pipeline(false);
    this.lower_pipeline.position.y = this.lowerBound;
    this.upper_pipeline.position.y = this.upperBound;
    this.add(this.upper_pipeline);
    this.add(this.lower_pipeline);
    this.updateObstaclePosition();
  }
    
  updateObstaclePosition(){
    this.upper_pipeline.updatePipelineHigger(this.upperBound - this.center_y - this.space_y/2);
    this.lower_pipeline.updatePipelineHigger(this.center_y - this.lowerBound - this.space_y/2);

    // Draw center obstacle
    var cube_geometry = new THREE.BoxGeometry (0.1,0.1,0);
    var cube_material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    var cube = new THREE.Mesh(cube_geometry, cube_material);
    cube.position.y = this.center_y;
    this.add(cube);
    console.log('Position center: ' + cube.position.y);
    
  }

  getUpperObstacleBound(){
    return this.upperBound - this.upper_pipeline.getSizeY() - 0.1;
  }

  getLowerObstacleBound(){
    return this.lowerBound + this.lower_pipeline.getSizeY() + 0.15;
  }

  calculateNewCenter(){
    return this.min + Math.random() * (Math.abs(this.min)+this.max);
  }

  update () {

  }

}