 
class Duck extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz



    this.upperBound = 10;
    this.lowerBound = -4.7;
    this.y = 0;
    this.z = 1;
    this.time = 250;
    this.rotZ = 0;

    var posZ = 1.2;
    var alturaIncremental = 0;
    
    this.pataDerecha = new Leg(posZ);
    this.pataIzquierda = new Leg(-posZ);
    alturaIncremental += this.pataDerecha.getPosY();
    this.cuerpo = new Cuerpo(alturaIncremental);
    this.alaDerecha = new Ala(alturaIncremental + this.cuerpo.getPosY()/2,2);
    this.alaIzquierda = new Ala(alturaIncremental + this.cuerpo.getPosY()/2,-2);
    alturaIncremental += this.cuerpo.getPosY();
    this.cabeza = new Cabeza(2,alturaIncremental);
    this.picoArriba = new Pico(alturaIncremental+this.cabeza.getPosY()/2, "picoArriba" );
    this.picoAbajo = new Pico(alturaIncremental+this.cabeza.getPosY()/2, "picoAbajo" );
    this.papada = new Papada(alturaIncremental+this.cabeza.getPosY()/2);
    this.ojoDerecho = new Ojo(alturaIncremental+this.cabeza.getPosY()/2,posZ);
    this.ojoIzquierdo = new Ojo(alturaIncremental+this.cabeza.getPosY()/2,-posZ);


    this.pataIzquierda.setPataAtras(this.cuerpo.getPosY());
    this.pataDerecha.setPataAtras(this.cuerpo.getPosY());

    this.add(this.pataDerecha);
    this.add(this.pataIzquierda);
    this.add(this.cuerpo);
    this.add(this.cabeza);
    this.add(this.picoArriba);
    this.add(this.picoAbajo);
    this.add(this.papada);
    this.add(this.ojoDerecho);
    this.add(this.ojoIzquierdo);
    this.add(this.alaDerecha);
    this.add(this.alaIzquierda);

    this.scale.set(0.1,0.1,0.1);
    this.position.set (0,this.y,1);
    this.instanciateAnimations();

  }
  


  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    this.alaDerecha.update();
    this.alaIzquierda.update();

    //this.y-=0.02;

    /*if(this.outOfUpperBound()){
      this.y = this.upperBound;
    }

    if(this.outOfLowerBound()){
      this.y = this.lowerBound;
    }*/

    //this.position.set (0,this.y,1);
   //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
   TWEEN.update();
    
  }

  outOfUpperBound(){
    return this.y >= this.upperBound;
  }

  outOfLowerBound(){
    return this.y <= this.lowerBound;
  }

  fly(){
    TWEEN.removeAll();
    var that= this;
    var limite = this.y+1.5;
    if(limite > this.upperBound){
      limite = this.upperBound;
    }
    this.animacionSubiendo.to({ y: limite }, that.time);
    this.rotacionHoraria.start();


  }

  startFallAnimation(){
    this.rotation.set (0,0,0);
    TWEEN.removeAll();
    this.rotacionAntiHoraria.start();
  }

  instanciateAnimations(){
    var that= this;
    this.animacionBajando = new TWEEN.Tween({y: that.y})
    .to({y: that.lowerBound})
    .easing( TWEEN.Easing.Elastic.In)
    .onUpdate( function ( ) {
        that.y-=0.1;
        
        if(that.outOfLowerBound()){
          that.y = that.lowerBound;
        }

        that.position.set (0,that.y,that.z);
        that.rotation.set (0,0,-1.1);
    })
    .onComplete( function () {console.log("COMPLETADA animacionBajando\n");})
    .repeat(Infinity);


    this.animacionSubiendo = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.time)
    .easing( TWEEN.Easing.Elastic.In)
    .onUpdate( function ( ) {
        that.y+=0.3;

        if(that.outOfUpperBound()){
          that.y = that.upperBound;
        }

        that.position.set (0,that.y,that.z);
        that.rotation.set (0,0,1.1);
    } )
    .onComplete( function () {
      console.log("COMPLETADA animacionSubiendo\n");
      that.rotation.set (0,0,0);
    });

    this.rotacionHoraria = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.time)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate( function ( ) {
        that.rotZ+=0.1;

        if(that.rotZ > 1.1){
          that.rotZ = 1.1;
        }

        that.rotation.set (0,0,that.rotZ);
    } )
    .onComplete( function () {
      console.log("COMPLETADA rotacionHoraria\n");
    });

    this.rotacionAntiHoraria = new TWEEN.Tween({y: that.y})
    .to({y: 0}, (that.time*3)/2)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate( function ( ) {
        that.rotZ-=0.1;

        if(that.rotZ < -1.1){
          that.rotZ = -1.1;
        }

        that.rotation.set (0,0,that.rotZ);
    } )
    .onComplete( function () {
      console.log("COMPLETADA rotacionAntiHoraria\n");
    });


    this.rotacionHoraria.chain(this.animacionSubiendo);
    this.animacionSubiendo.chain(this.rotacionAntiHoraria);
    this.rotacionAntiHoraria.chain(this.animacionBajando);




  }
}