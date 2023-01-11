var BPMInput = document.querySelector("#BPM-input");
var BPMSlider = document.querySelector("input[type='range']");
var BPMDecrease = document.querySelector("#BPM-decrease");
var BPMIncrease = document.querySelector("#BPM-increase");

var BPMStep = 5;
var BPMMin = parseInt(BPMSlider.getAttribute("min"));
var BPMMax = parseInt(BPMSlider.getAttribute("max"))

BPMSlider.addEventListener("change", () => {
    BPMInput.value = BPMSlider.value;
})

BPMIncrease.addEventListener("click", () => {
    changeBPM(Math.min(parseInt(BPMInput.value) + BPMStep, BPMMax));
});

BPMDecrease.addEventListener("click", () => {
    changeBPM(Math.max(parseInt(BPMInput.value) - BPMStep, BPMMin));
});

BPMInput.addEventListener("change", () => {
    if (!isNaN(BPMInput.value)) {
        changeBPM(Math.min(Math.max(parseInt(BPMInput.value), BPMMin), BPMMax));
    }

    else {
        changeBPM(60);
    }
});



function changeBPM(BPM) {
    BPMInput.value = BPM;
    BPMSlider.value = BPM;
}