let permissionGranted = false;
let permissionButton;
let osc;
let monoSynth;
var value1 = 0;

function preload() {
  bg = loadImage('angry.jpeg');
  bg2= loadImage('idle.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio();
  
  //device-motion, device-orientation
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    permissionButton = createButton('hello');
    permissionButton.style("font-size", "24px");
    permissionButton.center();
    permissionButton.mousePressed(requestAccess);
  } else {
    textSize(48);
    text("non ios device", 100, 100);
  }
  
  monoSynth = new p5.MonoSynth();
  osc = new p5.Oscillator('square');
  osc.amp(0.7);
  delay = new p5.Delay();
  delay.process(osc, 0.86, 0.32, 2300);
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
        permissionButton.remove();
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);
}

function playSynth() {
  userStartAudio();

  let note = random(['F5', 'E6', 'D2']);
  // note velocity (volume, from 0 to 1)
  let velocity = random();
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 1/4;

  monoSynth.play(note, velocity, time, dur);
}

function oscStart() {
  osc.start();
}

function draw() {
  if (!permissionGranted) return;
  
    // text
    background(bg);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
 
    // value limit
    value1 = constrain(value1 - 4, 0, 200)
 
    // if the value is greater than 100
    if (value1 > 100) {
        playSynth();
        oscStart();
        background(bg);
    } else {
        osc.stop();
        background(bg2);
        text("oh i hope no one starts pushing me around", width / 14, height / 2, 350, 200);
        text("i am small and i am stuck in a phone", width / 14, height / 6, 350, 200);
    }
  
}

function deviceMoved() {
 
    // now increase the value
    value1 = constrain(value1 + 10, 0, 255)
}

