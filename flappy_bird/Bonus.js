 class Bonus extends THREE.Object3D {
  constructor(value,type) {
    super();

    // Limites superior e inferior
    this.rotationY = 0;
    this.speed = 0.1;
    this.upperBound = 8.1;
    this.lowerBound = -5.15;
    this.rightBound = 13.65;
    this.leftBound = -13.65;
    this.bonusNumber = value;
    this.type = type;
    
    if(this.bonusNumber == 1){
      this.x = this.leftBound/2;
    }
    else if (this.bonusNumber == 2){
      this.x = this.rightBound/2;
    }
    

    // Posicion del obstaculo
    this.max_rigth_pos = this.rightBound + 2;
    this.max_left_pos = this.leftBound - 2;


    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshPhongMaterial( {color: 0x0000FF} );
    var sphere = new THREE.Mesh( geometry, material );

    geometry.scale(0.1,0.1,0.1);
    this.reset();
    this.add( sphere );

    this.box = new THREE.Box3();
  }

  update(){
    this.position.x -= this.speed;
    this.rotationY+= 0.01;
    this.rotateY(this.rotationY);
    if(this.position.x < this.max_left_pos){
      this.goToRightBound();
    }
  }

  reset(){
    this.position.set (this.x,0,0.5);
  }

  goToRightBound(){
    this.position.set (this.max_rigth_pos,0,0.5);
  }

  getBonusNumber(){
    return this.bonusNumber;
  }

  getXPosition(){
    return this.position.x;
  }

  getTypeBonus(){
    return this.type;
  }

  getWidth(){
    return 0.5;
  }

  getBox(){
    return this.box.setFromObject(this);
  }


}