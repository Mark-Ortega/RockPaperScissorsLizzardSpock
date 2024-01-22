import { GameStart } from "./gameFunctionality.js";

let pVp = document.getElementById("pVp");
let pVe = document.getElementById("pVe");
let easyM = document.getElementById("easyM");
let mediumM = document.getElementById("mediumM");
let hardM = document.getElementById("hardM");
let startTxt = document.getElementById("main-text");
let vsMode;
let dummyElm = document.getElementById("dummy");

pVp.addEventListener("click", function (e) {
  vsMode = true;
  DisplayOff(pVp, pVe);
  DisplayOn(easyM, mediumM, hardM);
  startTxt.textContent = "What difficulty would you like to play?";
});
pVe.addEventListener("click", function (e) {
  vsMode = false;
  DisplayOff(pVp, pVe);
  DisplayOn(easyM, mediumM, hardM);
});
easyM.addEventListener("click", function (e) {
  GameStart(1, vsMode);
  DisplayOff(easyM, mediumM, hardM);
});
mediumM.addEventListener("click", function (e) {
  GameStart(3, vsMode);
  DisplayOff(easyM, mediumM, hardM);
});
hardM.addEventListener("click", function (e) {
  GameStart(4, vsMode);
  DisplayOff(easyM, mediumM, hardM);
});

function DisplayOff(
  variable1 = dummyElm,
  variable2 = dummyElm,
  variable3 = dummyElm,
  variable4 = dummyElm,
  variable5 = dummyElm
) {
  variable1.classList.add("d-none");
  variable2.classList.add("d-none");
  variable3.classList.add("d-none");
  variable4.classList.add("d-none");
  variable5.classList.add("d-none");
}

function DisplayOn(
  variable1 = dummyElm,
  variable2 = dummyElm,
  variable3 = dummyElm,
  variable4 = dummyElm,
  variable5 = dummyElm
) {
  variable1.classList.remove("d-none");
  variable2.classList.remove("d-none");
  variable3.classList.remove("d-none");
  variable4.classList.remove("d-none");
  variable5.classList.remove("d-none");
}

export { DisplayOff };
export { DisplayOn };


