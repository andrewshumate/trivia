let currentCountry;
let eligibleCountries;
let numQuestionsAnswered = 0;

window.onload = () => {
    recalculateEligibleCountries();
    getAndShowNextFlag();
    document.getElementById("input").focus();

    // Submission listener
    const onSubmit = () => {
        const input = document.getElementById("input").value;
        if (isCorrectAnswer(input)) {
            setStats(currentCountry, true);
            showRightAnswerModal();
        } else {
            setStats(currentCountry, false, input);
            showWrongAnswerModal(currentCountry);
        }
    };

    document.getElementById("submit-button").onclick = onSubmit;
    document.getElementById("input").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            onSubmit();
        }
    });

    // Next button listener
    document.getElementById("next-button").addEventListener("click", () => {
        hideResultsModal();
        getAndShowNextFlag();
    });
};

function isCorrectAnswer(guess) {
    if (areStringsSimilar(currentCountry, guess)) return true;

    const alternateNames = flags[currentCountry].alternateNames;
    for (let i = 0; i < alternateNames.length; i++) {
        if (areStringsSimilar(alternateNames[i], guess)) return true;
    }

    return false;
}

function getAndShowNextFlag() {
    numQuestionsAnswered++;
    if (numQuestionsAnswered % 5 == 0 && getShouldReshowUnknown()) {
        const seenCountries = shuffle(Object.keys(localStorage));
        for (let i = 0; seenCountries.length; i++) {
            const stats = getStats(seenCountries[i]);
            if (stats && seenCountries[i] != currentCountry && stats.percentCorrect < 0.6) {
                currentCountry = seenCountries[i];
                break;
            }
        }
    } else {
        if (eligibleCountries.length == 0) recalculateEligibleCountries();
        currentCountry = eligibleCountries.pop();
    }

    document.getElementById("flag").src = flags[currentCountry].imageUrl;

    prefetchNextImages();
}

function recalculateEligibleCountries() {
    const allCountries = shuffle(Object.keys(flags));
    const mode = getMode();

    if (mode == "Show all mode") {
        eligibleCountries = allCountries;
    } else if (mode == "Show unseen mode") {
        const seenCountries = Object.keys(localStorage);
        eligibleCountries = allCountries.filter((country) => !seenCountries.includes(country));
    } else if (mode == "Show unknown mode") {
        eligibleCountries = allCountries.filter((country) =>
            getStats(country) ? getStats(country).percentCorrect < 0.6 : false
        );
    }

    if (eligibleCountries.length == 0) {
        eligibleCountries = allCountries;
    }
}
