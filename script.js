var BPMInput = document.querySelector("#BPM-input");
var BPMSlider = document.querySelector("input[type='range']");
var BPMDecrease = document.querySelector("#BPM-decrease");
var BPMIncrease = document.querySelector("#BPM-increase");

var defaultBPM = 60;
var BPMMin = parseInt(BPMSlider.getAttribute("min"));
var BPMMax = parseInt(BPMSlider.getAttribute("max"));
var BPMStep = 5;
var BPM = defaultBPM;

BPMSlider.addEventListener(
  "input",
  () => {
    BPMInput.value = BPMSlider.value;
    updateTick();
  },
  false
);

BPMIncrease.addEventListener("click", () => {
  var newBPM = BPMInput.value % BPMStep == 0 ? parseInt(BPMInput.value) + BPMStep : Math.ceil(parseInt(BPMInput.value) / 5) * 5;
  changeBPM(Math.min(newBPM, BPMMax));
  updateTick();
});

BPMDecrease.addEventListener("click", () => {
  var newBPM = BPMInput.value % BPMStep == 0 ? parseInt(BPMInput.value) - BPMStep : Math.floor(parseInt(BPMInput.value) / 5) * 5;
  changeBPM(Math.max(newBPM, BPMMin));
  updateTick();
});

BPMInput.addEventListener("change", () => {
  if (!isNaN(BPMInput.value)) {
    changeBPM(Math.min(Math.max(parseInt(BPMInput.value), BPMMin), BPMMax));
  } else {
    changeBPM(defaultBPM);
  }

  updateTick();
});

function changeBPM(BPM) {
  BPMInput.value = BPM;
  BPMSlider.value = BPM;
}

function updateTick() {
  if (playing) {
    stopTick();
    playTick();
  }
}

function getBPM() {
  return BPMInput.value;
}

var tickAudio = new Audio("tick.mp3");
var tickInterval;
var toggleButton = document.querySelector("#toggle");
var mainElement = document.querySelector("main");
var playing = false;

toggleButton.addEventListener("click", () => {
  if (playing) {
    stopTick();

    toggleButton.innerText = "Start";
    playing = false;
  } else {
    playTick();

    toggleButton.innerText = "Stop";
    playing = true;
  }
});

function playTick() {
  tickInterval = setInterval(() => {
    tickAudio.play();
    mainElement.style.backgroundColor = lightMode ? "rgb(80, 80, 80)" : "rgb(120, 120, 120)";
    setTimeout(() => {
      mainElement.removeAttribute("style");
    }, 100);
  }, (1 / (getBPM() / 60)) * 1000);
}

function stopTick() {
  clearInterval(tickInterval);
}

var lightMode = false;
var rootElement;
var selected = document.querySelector(".selected");
var themes = document.querySelector(".themes");

function toggleLightMode() {
  rootElement = document.documentElement;

  if (!lightMode) {
    selected.style.transform = "translateX(150%)";
    lightMode = true;
    rootElement.style.setProperty("--body", "rgb(196, 196, 196)");
    rootElement.style.setProperty("--main", "rgb(136, 136, 136)");
    rootElement.style.setProperty("--button", "rgb(116, 116, 116)");
    rootElement.style.setProperty("--button-hover", "rgb(104, 104, 104)");
    rootElement.style.setProperty("--text", "rgb(208, 208, 208)");
  } else {
    selected.style.transform = "translateX(0%)";
    lightMode = false;
    rootElement.style.setProperty("--body", "rgb(44, 44, 44)");
    rootElement.style.setProperty("--main", "rgb(78, 78, 78)");
    rootElement.style.setProperty("--button", "rgb(100, 100, 100)");
    rootElement.style.setProperty("--button-hover", "rgb(92, 92, 92)");
    rootElement.style.setProperty("--text", "rgb(208, 208, 208)");
  }
}

themes.addEventListener("click", () => {
  toggleLightMode();
});
