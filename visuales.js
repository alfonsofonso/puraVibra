//p5js canvas
var amp=window.innerWidth;
var alt=window.innerHeight;
var boton;

function setup() {
    createCanvas(amp-1, alt-1);
  
    background(10);
  
    boton = createButton('empieza');
    boton.size(100,100)
    boton.position(windowWidth/2-boton.width/2, windowHeight/2);
    boton.mousePressed(dale)
}

function draw(){
    //console.log("d")
}

function windowResized() {
    console.log("resizo")
    resizeCanvas(windowWidth, windowHeight);
    background(10)
    boton.position(windowWidth/2-boton.width/2, windowHeight/2);
  }