let currentCountry;
let eligibleCountries;
let numEligibleCountries;
let numQuestionsAnswered = 0;

window.onload = () => {
    recalculateEligibleCountries();
    invalidateCounter();
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
        invalidateCounter();
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
    let reshownCountry;
    if (numQuestionsAnswered % 5 == 0 && getShouldReshowUnknown()) {
        const flagSet = getFlagSet();
        for (let i = 0; i < flagSet.length; i++) {
            const stats = getStats(flagSet[i]);
            if (stats && flagSet[i] != currentCountry && stats.percentCorrect < 0.6) {
                reshownCountry = flagSet[i];
                currentCountry = reshownCountry;
                break;
            }
        }
    }

    if (reshownCountry == null) {
        if (eligibleCountries.length == 0) recalculateEligibleCountries();
        currentCountry = eligibleCountries.pop();
    }

    numQuestionsAnswered = (numQuestionsAnswered + 1) % numEligibleCountries;
    document.getElementById("flag").src = flags[currentCountry].imageUrl;
    prefetchNextImages();
}

function recalculateEligibleCountries() {
    const mode = getMode();
    let flagSet = getFlagSet();

    if (mode == "Show unseen mode") {
        const seenCountries = Object.keys(localStorage);
        flagSet = flagSet.filter((country) => !seenCountries.includes(country));
    } else if (mode == "Show unknown mode") {
        flagSet = flagSet.filter((country) =>
            getStats(country) ? getStats(country).percentCorrect < 0.6 : true
        );
    }

    if (flagSet.length == 0) {
        const allCountries = shuffle(Object.keys(flags));
        flagSet = allCountries;
    }

    eligibleCountries = flagSet;
    numEligibleCountries = eligibleCountries.length;
}

function invalidateCounter() {
    document.getElementById("counter").innerHTML = `${numQuestionsAnswered}/${numEligibleCountries}`;
}
