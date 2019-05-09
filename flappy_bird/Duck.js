 
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
    this.duracionSubida = 250;     
    this.duracionAnimacionHoraria = 250;
    this.duracionAnimacionAntihoraria = (this.duracionAnimacionHoraria*3)/2;
    this.nuevaPosicionRotacion = 1.1;  // Limite superior e inferior de rotacion en Z
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
    this.posicionActual = {y: 0};
    this.nuevaPosicion = {y: 0};
    this.instanciateAnimations();
    
    

    this.duckBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
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
    // Se eliminan antiguas animaciones
    TWEEN.removeAll();
    // Se define la nueva posicion
    this.nuevaPosicion.y = this.y+this.incrementoEnY;
    // Si la nueva posicion supera al limite establecido...
    if(this.nuevaPosicion.y > this.upperBound){
      this.nuevaPosicion.y = this.upperBound;
    }
    // Se actualiza posicion actual, para el siguiente click o pulsado de barra
    this.y = this.nuevaPosicion.y;
    // Se define la nueva posicion en la animacion con la duracion
    this.animacionSubiendo.to(this.nuevaPosicion, this.duracionSubida);
    // Comienza la animacion
    this.rotacionHoraria.start();
  }

  startFallAnimation(){
    this.rotation.set (0,0,0);
    TWEEN.removeAll();
  }

  // Inicializacion de animaciones

  instanciateAnimations(){

    var that= this;

    /* 
        this.posicionActual es la variable que va a estar actualizandose en todo momento
        .to indica a donde ir y la duracion de la animacion
        .easing indica como es la animacion -> https://sole.github.io/tween.js/examples/03_graphs.html
        .onUpdate define la funcion a hacer cada vez que actualiza el movimiento
            ahi dentro se actualiza el "this.y"
        .onComplete realiza la funcion despues de terminar la animacion

        .chain en la linea 176 encadena las animaciones cuando uno termina empieza el otro...
    */

    this.animacionBajando = new TWEEN.Tween(this.posicionActual)
                    .to( {y: that.lowerBound}, that.duracionBajada)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function() {
                        that.y = that.posicionActual.y;
                        that.position.set (0,that.posicionActual.y,that.z);
                        console.log("animacionBajando: " + that.posicionActual.y);
                    })
                    .onComplete( function () {that.posicionActual.y = that.y});



    this.animacionSubiendo = new TWEEN.Tween(this.posicionActual)
                    .to( 1, that.duracionSubida)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function() {
                        that.y = that.posicionActual.y;
                        that.position.set (0,that.posicionActual.y,that.z);
                        console.log("animacionSubiendo: " + that.posicionActual.y);
                    })
                    .onComplete( function () {that.posicionActual.y = that.y});

    this.rotacionHoraria = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.duracionAnimacionHoraria)
    .onUpdate( function ( ) {
        that.rotZ+=that.subida;

        if(that.rotZ > that.limiteRotacion){
          that.rotZ = that.limiteRotacion;
        }

        that.rotation.set (0,0,that.rotZ);
    } );

    this.rotacionAntiHoraria = new TWEEN.Tween({y: that.y})
    .to({y: 0}, that.duracionAnimacionAntihoraria)
    .onUpdate( function ( ) {
        that.rotZ-=that.subida;

        if(that.rotZ < -that.limiteRotacion){
          that.rotZ = -that.limiteRotacion;
        }

        that.rotation.set (0,0,that.rotZ);
    } );


    this.rotacionHoraria.chain(this.animacionSubiendo);
    this.animacionSubiendo.chain(this.rotacionAntiHoraria);
    this.rotacionAntiHoraria.chain(this.animacionBajando);
  }
}