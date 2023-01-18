var BPMInput = document.querySelector("#BPM-input");
var BPMSlider = document.querySelector("input[type='range']");
var BPMDecrease = document.querySelector("#BPM-decrease");
var BPMIncrease = document.querySelector("#BPM-increase");

var BPMStep = 5;
var BPMMin = parseInt(BPMSlider.getAttribute("min"));
var BPMMax = parseInt(BPMSlider.getAttribute("max"))

BPMSlider.addEventListener("change", () => {
    BPMInput.value = BPMSlider.value;
    updateTick();
})

BPMIncrease.addEventListener("click", () => {
    changeBPM(Math.min(parseInt(BPMInput.value) + BPMStep, BPMMax));
    updateTick();
});

BPMDecrease.addEventListener("click", () => {
    changeBPM(Math.max(parseInt(BPMInput.value) - BPMStep, BPMMin));
    updateTick();
});

BPMInput.addEventListener("change", () => {
    if (!isNaN(BPMInput.value)) {
        changeBPM(Math.min(Math.max(parseInt(BPMInput.value), BPMMin), BPMMax));
    }

    else {
        changeBPM(60);
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











var tick = new Audio("N:\Downloads\tick.mp3");
var tickInterval;
var toggleButton = document.querySelector("#toggle");
var mainElement = document.querySelector("main");
var playing = false;

toggleButton.addEventListener("click", () => {
    if (playing) {
        stopTick();

        toggleButton.innerText = "Start";
        playing = false;
    }

    else {
        playTick();

        toggleButton.innerText = "Stop";
        playing = true;
    }
});

function playTick() {
    tickInterval = setInterval(() => {
        console.log("tick");
        tick.play();
        mainElement.style.backgroundColor = "rgb(80, 80, 80)";
        setTimeout(() => {
            mainElement.removeAttribute("style");
        }, 100);
    }, 1 / (getBPM() / 60) * 1000);
}

function stopTick() {
    clearInterval(tickInterval);
}