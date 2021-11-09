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
        document.getElementById("additional-disparagement").innerHTML = getAdditionalDisparagement(stats);
    }

    showModal();
    document.getElementById("results").innerHTML = `No you dumbass, it's <b>${correctAnswer}</b>`;
    document.getElementById("quiz-section").classList.add("error-animation");
    document.getElementById("additional-disparagement").style.display = "revert";
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
    document.getElementById("additional-disparagement").style.display = "none";

    document.getElementById("quiz-section").classList.remove("error-animation");
    document.getElementById("quiz-section").classList.remove("success-animation");
}

function getAdditionalDisparagement(stats) {
    const result = [`You've gotten this right only ${parseInt(stats.percentCorrect * 100)}% of the time`];
    if (stats.incorrectGuesses.length == 0) return result.join("");

    result.push(", with stupid guesses like:")
    result.push("<ul>");

    for (let i = 0; i < stats.incorrectGuesses.length; i++) {
        const guess = stats.incorrectGuesses[i];

        if (flags[guess]) {
            result.push(`<li>${guess}. This is the ${guess} flag: <img class="mini-flags" src="${flags[guess].imageUrl}" /></li>`);
        } else {
            result.push(`<li>${guess} (not even a country)</li>`);
        }
    }

    result.push("</ul>");
    return result.join("");
}
