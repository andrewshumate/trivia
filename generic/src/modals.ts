import * as userSettings from "./storage";
import { flags } from "./data";
import * as binding from "./binding";
import {
    recalculateEligibleCountries,
    invalidateCounter,
    getAndShowNextFlag,
    resetNumQuestionAnswered,
} from "./scripts";

export function showSettings() {
    binding.modeSetting.value = userSettings.getMode();
    binding.flagSetSetting.value = userSettings.getFlagSetString();
    binding.reshowSetting.checked = userSettings.getShouldReshowUnknown();
    document.getElementById("settings-section")!.style.display = "revert";
}

export function hideSettings() {
    document.getElementById("settings-section")!.style.display = "none";

    const mode = binding.modeSetting.value;
    const flagSet = binding.flagSetSetting.value;
    const shouldReshowUnknown = binding.reshowSetting.checked;

    if (userSettings.getMode() != mode || userSettings.getFlagSetString() != flagSet) {
        localStorage.setItem("mode", mode);
        localStorage.setItem("flag-set", flagSet);

        resetNumQuestionAnswered();
        recalculateEligibleCountries();
        invalidateCounter();
        getAndShowNextFlag();
    }

    localStorage.setItem("shouldReshowUnknown", shouldReshowUnknown.toString());
}

export function showResultsModal(correctAnswer: string) {
    const stats = userSettings.getStats(correctAnswer);
    if (stats) {
        document.getElementById("additional-info")!.innerHTML = getAdditionalInfo(stats);
    }

    binding.inputBox.style.display = "none";
    document.getElementById("submit-button")!.style.display = "none";

    document.getElementById("results")!.style.display = "revert";
    document.getElementById("next-button")!.style.display = "revert";
    document.getElementById("additional-info")!.style.display = "revert";

    document.getElementById("next-button")!.focus();
}

export function showWrongAnswerModal(correctAnswer: string) {
    showResultsModal(correctAnswer);
    document.getElementById("results")!.innerHTML = `No, it's <b>${correctAnswer}</b>.`;
    document.getElementById("quiz-section")!.classList.add("error-animation");
}

export function showRightAnswerModal(correctAnswer: string) {
    showResultsModal(correctAnswer);
    document.getElementById("results")!.innerHTML = `Correct!`;
    document.getElementById("quiz-section")!.classList.add("success-animation");
}

export function hideResultsModal() {
    binding.inputBox.value = "";
    binding.inputBox.style.display = "revert";
    binding.inputBox.focus();

    document.getElementById("submit-button")!.style.display = "revert";

    document.getElementById("results")!.style.display = "none";
    document.getElementById("next-button")!.style.display = "none";
    document.getElementById("additional-info")!.style.display = "none";

    document.getElementById("quiz-section")!.classList.remove("error-animation");
    document.getElementById("quiz-section")!.classList.remove("success-animation");
}

function getAdditionalInfo(stats: userSettings.Stats) {
    const result = [`You've gotten this right <b>${stats.numCorrectGuesses}/${stats.numTotalGuesses}</b>`];
    result.push(` (<b>${stats.percentCorrect * 100}%</b>) times.`);
    if (stats.incorrectGuesses.length == 0) return result.join("");

    result.push(" Previous guesses:");
    result.push("<ul>");

    for (let i = 0; i < stats.incorrectGuesses.length; i++) {
        const guess = stats.incorrectGuesses[i];
        const image = flags.get(guess);

        if (image) {
            result.push(
                `<li>${guess}. This is the ${guess} flag: <img class="mini-flags" src="${image.imageUrl}" /></li>`
            );
        } else {
            result.push(`<li>${guess} (not a country)</li>`);
        }
    }

    result.push("</ul>");
    return result.join("");
}
