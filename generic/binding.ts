// This is temporary and will be removed later with Svelte
let inputBox: HTMLInputElement;
let flagImage: HTMLImageElement;
let settingsForm;
let flagSetSetting: HTMLInputElement;
let modeSetting: HTMLInputElement;
let reshowSetting: HTMLInputElement;

function initBinding(): void {
    inputBox = <HTMLInputElement> document.getElementById("input");
    flagImage = <HTMLImageElement> document.getElementById("flag");
    settingsForm = document.forms[0];
    flagSetSetting = <HTMLInputElement> settingsForm["flag-set"];
    modeSetting = <HTMLInputElement> settingsForm["mode"];
    reshowSetting = <HTMLInputElement> settingsForm["reshow-unknown"];
}