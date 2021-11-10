function showSettings() {
    document.forms["mode-selector"].elements["mode"].value = getMode();
    document.forms["mode-selector"].elements["reshow-unknown"].checked = getShouldReshowUnknown();
    document.getElementById("settings-section").style.display = "revert";
}

function hideSettings() {
    document.getElementById("settings-section").style.display = "none";

    const mode = document.forms["mode-selector"].elements["mode"].value;
    const shouldReshowUnknown = document.forms["mode-selector"].elements["reshow-unknown"].checked;

    localStorage.setItem("mode", mode);
    localStorage.setItem("shouldReshowUnknown", shouldReshowUnknown);

    recalculateEligibleCountries();
}

function showModal() {
    document.getElementById("input").style.display = "none";
    document.getElementById("submit-button").style.display = "none";

    document.getElementById("results").style.display = "revert";
    document.getElementById("next-button").style.display = "revert";

    document.getElementById("next-button").focus();
}

function showErrorModal(correctAnswer) {
    const stats = getStats(currentCountry);
    if (stats) {
        document.getElementById("additional-info").innerHTML = getAdditionalInfo(stats);
    }

    showModal();
    document.getElementById("results").innerHTML = `No, it's <b>${correctAnswer}</b>.`;
    document.getElementById("quiz-section").classList.add("error-animation");
    document.getElementById("additional-info").style.display = "revert";
}

function showSuccessModal() {
    showModal();
    document.getElementById("results").innerHTML = `Correct!`;
    document.getElementById("quiz-section").classList.add("success-animation");
}

function hideModal() {
    document.getElementById("input").value = "";
    document.getElementById("input").style.display = "revert";
    document.getElementById("input").focus();

    document.getElementById("submit-button").style.display = "revert";

    document.getElementById("results").style.display = "none";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("additional-info").style.display = "none";

    document.getElementById("quiz-section").classList.remove("error-animation");
    document.getElementById("quiz-section").classList.remove("success-animation");
}

function getAdditionalInfo(stats) {
    const result = [`You've gotten this right <b>${stats.numCorrectGuesses}/${stats.numTotalGuesses}</b>`];
    result.push(` (<b>${parseInt(stats.percentCorrect * 100)}%</b>) times.`);
    if (stats.incorrectGuesses.length == 0) return result.join("");

    result.push(" Previous guesses:")
    result.push("<ul>");

    for (let i = 0; i < stats.incorrectGuesses.length; i++) {
        const guess = stats.incorrectGuesses[i];

        if (flags[guess]) {
            result.push(`<li>${guess}. This is the ${guess} flag: <img class="mini-flags" src="${flags[guess].imageUrl}" /></li>`);
        } else {
            result.push(`<li>${guess} (not a country)</li>`);
        }
    }

    result.push("</ul>");
    return result.join("");
}
