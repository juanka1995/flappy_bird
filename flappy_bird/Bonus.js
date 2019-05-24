 class Bonus extends THREE.Object3D {
  constructor() {
    super();

    // Limites superior e inferior
    this.rotacionY = 0;
    this.speed = 0.1;
    this.upperBound = 8.1;
    this.lowerBound = -5.15;
    this.rightBound = 13.65;
    this.leftBound = -13.65;
    var width_window = this.upperBound - this.lowerBound;
    var respect_space = 0.3;

    // Posicion del obstaculo
    this.max_rigth_pos = this.rightBound + 2;
    this.max_left_pos = this.leftBound - 2;


    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshPhongMaterial( {color: 0x0000FF} );
    var sphere = new THREE.Mesh( geometry, material );

    geometry.scale(0.1,0.1,0.1);
    this.reset();

    this.add( sphere );
  }

  update(){
    this.position.x -= this.speed;
    this.rotacionY+= 0.01;
    this.rotateY(this.rotacionY);
    if(this.position.x < this.max_left_pos){
      this.reset();
    }
  }

  reset(){
    this.position.set (12,0,3);
  }


}