// This is temporary and will be removed later with Svelte
export let inputBox: HTMLInputElement;
export let flagImage: HTMLImageElement;
export let settingsForm: any;
export let flagSetSetting: HTMLInputElement;
export let modeSetting: HTMLInputElement;
export let reshowSetting: HTMLInputElement;

export function initBinding(): void {
    inputBox = <HTMLInputElement> document.getElementById("input");
    flagImage = <HTMLImageElement> document.getElementById("flag");
    settingsForm = document.forms[0];
    flagSetSetting = <HTMLInputElement> settingsForm["flag-set"];
    modeSetting = <HTMLInputElement> settingsForm["mode"];
    reshowSetting = <HTMLInputElement> settingsForm["reshow-unknown"];
}