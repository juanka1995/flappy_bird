
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
      createNewScene();
    }
};

function onClick(event) {
  if(!scene.getEndGame()){
    scene.startGame();
  }
  else {
    createNewScene();
  }
};

// Función callback para cambiar el valor de la puntuacion
function changeScore(value){
  score.innerHTML = value;
}



function showFinalScore(){
  if (typeof(Storage) !== "undefined") {
    if (!localStorage.score | localStorage.score < score.innerHTML) {
      localStorage.score = score.innerHTML;
    }

    finalScore.innerHTML = "Tu puntuacion ha sido: " + score.innerHTML + "<br>" + "Tu puntuacion total guardada: " + localStorage.score + "<br>"+ "Haz click o pulsa la barra espaciadora para empezar de nuevo<br>";
  }
  else {
    finalScore.innerHTML = "Tu puntuacion ha sido: " + score.innerHTML + "<br>" + "Haz click o pulsa la barra espaciadora para empezar de nuevo<br>";
  }
  finalScore.style.display = "block";
}


function changeLifes(sumar){
  if(sumar)
    lifes.innerHTML += "♥";
  else
    lifes.innerHTML = lifes.innerHTML.slice(0, lifes.innerHTML.length-1);
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

  // Actualizar posición de los divs score y lifes
  score.style.top = window.innerHeight*0.88 + 'px';
  score.style.left = window.innerWidth*0.47 + 'px';
  lifes.style.top = window.innerHeight*0.1 + 'px';
  lifes.style.left = window.innerWidth*0.1 + 'px';
  finalScore.style.top = window.innerHeight*0.4 + 'px';
  finalScore.style.left = window.innerWidth*0.35 + 'px';

}

/// Función que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

// Función encargada de crear una nueva escena
function createNewScene(){
  finalScore.style.display = "none";
  scene = new FlappyBird (renderer.domElement, changeScore, changeLifes, showFinalScore);
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

  // DIV para la puntuacion
  score = document.createElement('div');
  score.classList.add('score');
  score.setAttribute("id", "score");
  document.body.appendChild(score);

  // DIV para las vidas
  lifes = document.createElement('div');
  lifes.classList.add('lifes');
  lifes.setAttribute("id", "lifes");
  document.body.appendChild(lifes);

  // DIV para la puntuacion
  finalScore = document.createElement('div');
  finalScore.classList.add('finalScore');
  finalScore.setAttribute("id", "finalScore");
  document.body.appendChild(finalScore);
  
  // Se crea la escena. La escena es una instancia de nuestra propia clase encargada de crear y gestionar todos los elementos que intervienen en la escena.
  createNewScene();

  // Finalmente, realizamos el primer renderizado.
  render();
});
