// This is temporary and will be removed later with Svelte
let inputBox;
let flagImage;
let settingsForm;
let flagSetSetting;
let modeSetting;
let reshowSetting;
function initBinding() {
    inputBox = document.getElementById("input");
    flagImage = document.getElementById("flag");
    settingsForm = document.forms[0];
    flagSetSetting = settingsForm["flag-set"];
    modeSetting = settingsForm["mode"];
    reshowSetting = settingsForm["reshow-unknown"];
}
