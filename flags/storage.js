function setStats(country, wasGuessCorrect, guess) {
    let stats = JSON.parse(localStorage.getItem(country)) || {
        numCorrectGuesses: 0,
        numIncorrectGuesses: 0,
        numTotalGuesses: 0,
        percentCorrect: 0.0,
        incorrectGuesses: [],
    };

    stats.numTotalGuesses += 1;
    if (wasGuessCorrect) {
        stats.numCorrectGuesses += 1;
    } else {
        stats.numIncorrectGuesses += 1;

        let standardizedGuess = standardizeString(guess);
        standardizedGuess = possibleNameToOfficalName[standardizedGuess];
        if (standardizedGuess == null) standardizedGuess = guess.trim();
        if (standardizedGuess && !stats.incorrectGuesses.includes(standardizedGuess)) {
            stats.incorrectGuesses.push(standardizedGuess);
        }
    }
    stats.percentCorrect = stats.numCorrectGuesses / stats.numTotalGuesses;

    localStorage.setItem(country, JSON.stringify(stats));
}

function getStats(country) {
    try {
        return JSON.parse(localStorage.getItem(country));
    } catch (e) {
        return null;
    }
}

function getFlagSetString() {
    return localStorage.getItem("flag-set") || "All flags"
}

function getFlagSet() {
    const flagSetString = getFlagSetString();

    if (flagSetString == "All flags") {
        return shuffle(Object.keys(flags));
    } else if (flagSetString == "Nordic cross flags") {
        return shuffle([...nordicCrossFlags]);
    } else if (flagSetString == "Three stripe flags") {
        return shuffle([...threeStripeFlags]);
    } else if (flagSetString == "Hoist triangle flags") {
        return shuffle([...triangleOnHoistFlags]);
    }
}

function getMode() {
    return localStorage.getItem("mode") || "Show unseen mode";
}

function getShouldReshowUnknown() {
    return localStorage.getItem("shouldReshowUnknown") !== "false";
}
