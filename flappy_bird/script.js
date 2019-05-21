
/// La escena que tendrá todo lo que se tiene en cuenta al hacer un render
//  Lo que no esté incluido en la escena no será procesado por el renderer
scene = null;

/// La variable que referenciará al renderer
renderer = null;

/// El objeto que referencia a la interfaz gráfica de usuario
gui = null;

score = null;
lifes = null;


/// Se crea y configura un renderer WebGL
/**
 * El renderer recorrerá el grafo de escena para procesarlo y crear la imagen resultante. 
 * Debe hacer este trabajo para cada frame.
 * Si se cambia el grafo de escena después de visualizar un frame, los cambios se verán en el siguiente frame.
 * 
 * @return El renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  // Se establece un color de fondo en las imágenes que genera el render
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  
  // Se establece el tamaño, se aprovoche la totalidad de la ventana del navegador
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  return renderer;  
}

function onDocumentKeyDown(event) {
    var code = event.code;
    if (code == "Space" && !scene.getEndGame()) {
      scene.startGame();
    }
    else if (code == "Space" && scene.getEndGame()){
      // alert("Puntuación: " + score.innerHTML);
      scene.resetGame();
    }
};

function onClick(event) {
  if(!scene.getEndGame())
    scene.startGame();
};

// Función callback para cambiar el valor de la puntuacion

function changeScore(value){
  score.innerHTML = value;
}

function changeLifes(value){
  lifes.innerHTML = value;
}

/// Función que se encarga de renderizar un frame
/**
 * Se renderiza la escena, captada por una cámara.
 */
function render() {
  // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
  // La propia función render es la que indica que quiere ejecutarse la proxima vez
  // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
  requestAnimationFrame(render);
  
  // Se le pide a la escena que se actualice antes de ser renderizada
  scene.update();
  
  // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
  renderer.render(scene, scene.getCamera());
}

/// Función que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}



/// La función principal
$(function () {
  // Se crea el renderer
  renderer = createRenderer();
  
  // La salida del renderer se muestra en un DIV de la página index.html
  $("#WebGL-output").append(renderer.domElement);
  
  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("keydown", onDocumentKeyDown);
  window.addEventListener ("click", onClick);


  score = document.createElement('div');
  score.style.position = 'absolute';
  score.style.fontSize = '-webkit-xxx-large';
  score.style.fontFamily = 'Verdana, Geneva, sans-serif'
  score.innerHTML = "0";
  score.style.top = window.innerHeight*0.1 + 'px';
  score.style.left = window.innerWidth/2 + 'px';
  document.body.appendChild(score);

  lifes = document.createElement('div');
  lifes.style.position = 'absolute';
  //lifes.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
  lifes.style.fontSize = '-webkit-xxx-large';
  lifes.style.fontFamily = 'Verdana, Geneva, sans-serif'
  //lifes.style.backgroundColor = "blue";
  lifes.innerHTML = "1";
  lifes.style.top = window.innerHeight*0.1 + 'px';
  lifes.style.left = window.innerWidth*0.1 + 'px';
  document.body.appendChild(lifes);
  // Se crea una interfaz gráfica de usuario vacia
  //gui = new dat.GUI();
  
  // Se crea la escena. La escena es una instancia de nuestra propia clase encargada de crear y gestionar todos los elementos que intervienen en la escena.
  scene = new FlappyBird (renderer.domElement, changeScore, changeLifes);

  // Finalmente, realizamos el primer renderizado.
  render();
});
