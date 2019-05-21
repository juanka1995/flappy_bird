 
class Duck extends THREE.Object3D {
  constructor() {
    super();


    // Variables de posiciones
    this.upperBound = 10;
    this.lowerBound = -5.3;
    this.x = 2;
    this.y = 0;
    this.z = 0.5;
    

    // Variables de las animaciones
    this.ascent = 0.175;          // Incrementado o decrementado de posicion
    this.rotZ = 0;              // Vuelve a poner la rotacion en 0
    this.ascentDuration = 250;     // Duracion de la animacion de subida
    this.clockwiseAnimationDuration = 50; // Duracion de la animacion de rotacion
    this.descentDuration = 100;         // Animacion estandar de la bajada
    this.rotationBound = 0.5;  // Limite superior e inferior de rotacion en Z
    this.incrementalY = 2;   // Siguiente posicion en la que va a estar en Y: posActual = posActual + this.incrementalY


    // Variables para el correcto posicionamiento de las partes de PATO
    var posZ = 1.2;
    var incrementalHeight = 0;
    
    this.rightLeg = new Leg(posZ);
    this.leftLeg = new Leg(-posZ);
    incrementalHeight += this.rightLeg.getPosY();
    this.body = new Cuerpo(incrementalHeight);
    this.rightWing = new Ala(incrementalHeight + this.body.getPosY()/2,2);
    this.leftWing = new Ala(incrementalHeight + this.body.getPosY()/2,-2);
    incrementalHeight += this.body.getPosY();
    this.head = new Cabeza(this.x,incrementalHeight);
    this.upperLip = new Pico(incrementalHeight+this.head.getPosY()/2, "upperLip" );
    this.lowerLip = new Pico(incrementalHeight+this.head.getPosY()/2, "lowerLip" );
    this.doubleChin = new Papada (incrementalHeight+this.head.getPosY()/2);
    this.rightEye = new Ojo(incrementalHeight+this.head.getPosY()/2,posZ);
    this.leftEye = new Ojo(incrementalHeight+this.head.getPosY()/2,-posZ);


    // Posicion las patas hacia atras pareciendo que PATO vuela
    this.leftLeg.setPataAtras(this.body.getPosY());
    this.rightLeg.setPataAtras(this.body.getPosY());

    this.add(this.rightLeg);
    this.add(this.leftLeg);
    this.add(this.body);
    this.add(this.head);
    this.add(this.upperLip);
    this.add(this.lowerLip);
    this.add(this.doubleChin);
    this.add(this.rightEye);
    this.add(this.leftEye);
    this.add(this.rightWing);
    this.add(this.leftWing);

    // Escalado y posicionamiento 

    this.scale.set(0.1,0.1,0.1);
    this.position.set (0,this.y,this.z);

    // Instanciacion de variables para la subida y bajada

    this.actualPosition = {y: 0};
    this.newPosition = {y: 0};

    // Instanciacion de animaciones

    this.instanciateAnimations();

    // Creacion del cubo de PATO sin definir limites

    this.box = new THREE.Box3();
  }

  update () {

    // Animacion de las alas 

    this.rightWing.update();
    this.leftWing.update();

    TWEEN.update();
    
  }

  // Comprobar posición superior PATO
  outOfUpperBound(){
    return this.y >= this.upperBound;
  }

  // Comprobar posición inferior PATO
  outOfLowerBound(){
    return this.y <= this.lowerBound;
  }

  // Acción de volar del pato
  fly(){
    // Se eliminan antiguas animaciones
    TWEEN.removeAll();
    // Se define la nueva posicion
    this.newPosition.y = this.y+this.incrementalY;
    // Si la nueva posicion supera al limite establecido...
    if(this.newPosition.y > this.upperBound){
      this.newPosition.y = this.upperBound;
    }
    // Se actualiza posicion actual, para el siguiente click o pulsado de barra
    this.y = this.newPosition.y;
    // Se define la nueva posicion en la animacion con la duracion
    this.ascentAnimation.to(this.newPosition, this.ascentDuration);
    // Se define una mayor duracion de la caida cuanto mas arriba este
    this.descentAnimation.to({y: this.lowerBound}, (this.newPosition.y - this.lowerBound)*this.descentDuration)
    // Comienza la animacion
    this.ascentAnimation.start();
  }

  // Inicializacion de animaciones
  instanciateAnimations(){

    var that = this;

    // Definicion de las animaciones

    this.descentAnimation = new TWEEN.Tween(this.actualPosition)
                    .to( {y: that.lowerBound}, that.descentDuration)
                    .easing(TWEEN.Easing.Quadratic.In)
                    .onUpdate(function() {
                        // Se define la nueva posicion en Y segun TWEEN y la actualiza
                        that.y = that.actualPosition.y;
                        that.position.set (0,that.actualPosition.y,that.z);
                    })
                    // Al completar la funcion almacena la nueva Y
                    .onComplete( function () {that.actualPosition.y = that.y});



    this.ascentAnimation = new TWEEN.Tween(this.actualPosition)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function() {
                        // Se define la nueva posicion en Y segun TWEEN y la actualiza
                        that.y = that.actualPosition.y;
                        that.position.set (0,that.actualPosition.y,that.z);
                        // Pone a PATO sin rotaciones
                        that.rotation.set (0,0,0);
                    })
                    // Al completar la funcion almacena la nueva Y
                    .onComplete( function () {that.actualPosition.y = that.y});

    this.clockwiseAnimation = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.clockwiseAnimationDuration)
    .onUpdate( function ( ) {

        // Se cambian la rotacion en Z segun TWEEN y la actualiza
        that.rotZ-=that.ascent;

        if(that.rotZ < -that.rotationBound){
          that.rotZ = -that.rotationBound;
        }

        that.rotation.set (0,0,that.rotZ);
    } )

    // Se encadenan las diferentes animaciones para que transcurran una detras de otra
    this.ascentAnimation.chain(this.clockwiseAnimation);
    this.clockwiseAnimation.chain(this.descentAnimation);
  }

  // Devuelve la posicion en X de PATO
  getXPosition(){
    return this.position.x;
  }

  // Devuelve la posicion en Y de PATO
  getYPosition(){
    return this.y;
  }

  // Devuelve la caja de colision de PATO
  getBox(){
    return this.box.setFromObject(this);
  }

  // Pone a PATO en su posicion original
  reset(){
    TWEEN.removeAll();
    this.position.set (0,0,this.z);
    this.rotation.set (0,0,0);
    this.y = 0;
    this.actualPosition.y = 0;
  }

}