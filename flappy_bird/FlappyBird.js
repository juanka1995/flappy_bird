 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class FlappyBird extends THREE.Scene {
  constructor (unRenderer) {
    super();
    
    // Construimos los distinos elementos que tendremos en la escena
    this.createBackGround();
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera (unRenderer);
    
    // Por último creamos la caja del ejemplo, como una instancia de una clase propia, que gestionará su creación y la interacción con la misma
    this.duck = new Duck();
    this.add (this.duck);
  }
  
  createCamera (unRenderer) {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 0, 20);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
  }
  
  createBackGround () {
    // Valor para mover el fondo
    this.time = 0;
    // Una figura es un Mesh
    this.background = new THREE.Mesh ();
    // Un Mesh se compone de geometría y material
    this.background.geometry = new THREE.BoxGeometry (30,17,0);
    // Las primitivas básicas se crean centradas en el origen
    // Como material se crea uno a partir de una textura
    this.texture = new THREE.TextureLoader().load('../imgs/width_fondo_bar.png');
    this.texture.wrapS = THREE.RepeatWrapping;

    this.background.material = new THREE.MeshPhongMaterial ({map: this.texture});
    // Por último se añade el suelo a la escena
    this.add (this.background);
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 1);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, 1);
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }
  
  update () {    
    // Se actualiza el resto del modelo
    this.duck.update();
    
    // Mover el fondo
    this.time++;
    this.texture.offset.x = this.time*0.0015;
  }
}