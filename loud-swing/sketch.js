let permissionGranted = false;
let value1 = 0;
let cryingSound;
let laughSynth;
let permissionButton;
let bg, bg2;

function preload() {
  bg = loadImage('cry.jpeg');
  bg2 = loadImage('laugh.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  cryingSound = new p5.Oscillator('sine');
  cryingSound.amp(1);
  cryingSound.start();
  
  laughSynth = new p5.Oscillator('square');

  // device-motion, device-orientation
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    permissionButton = createButton('hello');
    permissionButton.style("font-size", "24px");
    permissionButton.center();
    permissionButton.mousePressed(requestAccess);
  } else {
    textSize(48);
    text("non ios device", 100, 100);
  }
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

function draw() {
  if (!permissionGranted) return;
  
  let combinedFrequency = 500 + sin(frameCount * 0.4) * 50 + noise(frameCount * 0.2) * 100;
  cryingSound.freq(combinedFrequency);
  laughSynth.amp(0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);

  // value limit
  value1 = constrain(value1 - 4, 0, 200);
  
  if (value1 > 200) {
    background(bg2);
    if (cryingSound.isPlaying()) {
              cryingSound.amp(0);
              cryingSound.stop();
    }
    if (laughSynth.amp() > 0) {
      laughSynth.amp(0, 0.5);
    }
  } else {
    background(bg);
    text("oh i hope someone starts swinging me around", width / 14, height / 2, 350, 200);
    text("i am small and i want someone to swing me..!", width / 14, height / 6, 350, 200);
    if (laughSynth.amp() === 0) {
      playLaughSequence();
      if (!cryingSound.isPlaying()) {
            cryingSound.amp(0);
            cryingSound.stop();
    }
  }
}
}

function deviceMoved() {
  // now increase the value
  value1 = constrain(value1 + 40, 0, 200);
  playLaughSequence();
  background(bg2);
}

function playLaughSequence() {
  laughSynth.stop(); // Stop the synth before starting it again
  laughSynth.start();
  laughSynth.freq(random(400, 800));
  laughSynth.setType('square'); // Change to the appropriate waveform
  laughSynth.amp(0.8);

  for (let i = 0; i < 5; i++) {
    let delayTime = random(0.8, 1);
    let pChange = random(30, 80);
    let volChange = random(0.4, 0.5);

    setTimeout(() => {
      laughSynth.freq(laughSynth.freq() + pChange);
      laughSynth.amp(laughSynth.amp() + volChange, 0.1);
    }, delayTime * 1000);
  }

  setTimeout(() => {
    if (laughSynth.amp() > 0) {
      laughSynth.amp(0, 0.5);
    }
  }, 100);
}
