 
class Duck extends THREE.Object3D {
  constructor() {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz


    // Variables de posiciones
    this.upperBound = 10;
    this.lowerBound = -4.7;
    this.y = 0;
    this.z = 1;
    

    // Variables de las animaciones
    this.subida = 0.175;          // Incrementado o decrementado de posicion
    this.rotZ = 0;              // Vuelve a poner la rotacion en 0
    this.duracionSubida = 500;     
    this.duracionAnimacionHoraria = 250;
    this.duracionAnimacionAntihoraria = (this.duracionAnimacionHoraria*3)/2;
    this.limiteRotacion = 1.1;  // Limite superior e inferior de rotacion en Z
    this.incrementoEnY = 2;   // Siguiente posicion en la que va a estar en Y: posActual = posActual + this.incrementoEnY

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
    this.position.set (0,this.y,this.z);
    this.instanciateAnimations();

    //this.duckBox = new Box3(new THREE.Vector3(), new THREE.Vector3());
  }
  


  
  update () {

    this.alaDerecha.update();
    this.alaIzquierda.update();

    TWEEN.update();
    
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
    TWEEN.removeAll();
    var that= this;
    var limite = this.y+this.incrementoEnY;
    if(limite > this.upperBound){
      limite = this.upperBound;
    }
    this.animacionSubiendo.to({ y: limite }, that.duracionAnimacionHoraria);
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
        that.y-=that.subida;
        
        if(that.outOfLowerBound()){
          that.y = that.lowerBound;
        }

        that.position.set (0,that.y,that.z);
        that.rotation.set (0,0,-that.limiteRotacion);
    })
    .onComplete( function () {console.log("COMPLETADA animacionBajando\n");})
    .repeat(Infinity);


    this.animacionSubiendo = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.duracionSubida)
    .easing( TWEEN.Easing.Elastic.In)
    .onUpdate( function ( ) {
        that.y+=that.subida;

        if(that.outOfUpperBound()){
          that.y = that.upperBound;
        }

        that.position.set (0,that.y,that.z);
        that.rotation.set (0,0,that.limiteRotacion);
    } )
    .onComplete( function () {
      console.log("COMPLETADA animacionSubiendo\n");
      that.rotation.set (0,0,0);
    });

    this.rotacionHoraria = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.duracionAnimacionHoraria)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate( function ( ) {
        that.rotZ+=that.subida;

        if(that.rotZ > that.limiteRotacion){
          that.rotZ = that.limiteRotacion;
        }

        that.rotation.set (0,0,that.rotZ);
    } )
    .onComplete( function () {
      console.log("COMPLETADA rotacionHoraria\n");
    });

    this.rotacionAntiHoraria = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.duracionAnimacionAntihoraria)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate( function ( ) {
        that.rotZ-=that.subida;

        if(that.rotZ < -that.limiteRotacion){
          that.rotZ = -that.limiteRotacion;
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