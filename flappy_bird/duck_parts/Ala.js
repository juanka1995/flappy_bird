
class Ala extends THREE.Mesh {
  constructor(posY,posZ) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.y=2;
    this.rotacion = 0;
    this.upperBoundAnimation = 1.1;
    this.lowerBoundAnimation = -1.1;
    // Un Mesh se compone de geometría y material
    this.geometry = new THREE.BoxGeometry (this.y*2 - 0.5,this.y/4,this.y);
    // Las primitivas básicas se crean centradas en el origen
    // Se puede modificar su posición con respecto al sistema de coordenadas local con una transformación aplicada directamente a la geometría.
    // Como material se crea uno a partir de un color
    this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
    this.posZ = posZ;
    this.posY = posY;
    if(posZ < 0){
      this.geometry.translate(0, 0, -this.y/2);
      this.position.set (0,this.posY+this.y/2,-2);
    }
    else{
      this.geometry.translate(0, 0, +this.y/2);
      this.position.set (0,this.posY+this.y/2,+this.posZ);
    }

    this.cambiaAnimacion = false;

  }

  getPosY(){
    return this.y;
  }
  getPosX(){
    return this.y;
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    //this.position.set (this.guiControls.posX,0,this.posZ);
    if(this.cambiaAnimacion){
      this.rotacion += 0.1;
    }
    else{
      this.rotacion -= 0.1;
    }

    this.checkAnimation();

    if(this.posZ > 0){
      this.rotation.set (this.rotacion,0,0);
    }
    else{
      this.rotation.set (-this.rotacion,0,0);
    }
    //this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }

  checkAnimation(){
    if(this.rotacion <= this.lowerBoundAnimation){
      this.cambiaAnimacion = true;
    }
    else if(this.rotacion >= this.upperBoundAnimation){
      this.cambiaAnimacion = false;
    }
  }
}