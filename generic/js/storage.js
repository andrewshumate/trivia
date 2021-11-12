function setStats(country, wasGuessCorrect, guess) {
    const statsString = localStorage.getItem(country);
    let stats = statsString
        ? JSON.parse(statsString)
        : {
            numCorrectGuesses: 0,
            numIncorrectGuesses: 0,
            numTotalGuesses: 0,
            percentCorrect: 0.0,
            incorrectGuesses: [],
        };
    stats.numTotalGuesses += 1;
    if (wasGuessCorrect) {
        stats.numCorrectGuesses += 1;
    }
    else {
        stats.numIncorrectGuesses += 1;
        let standardizedGuess = possibleNameToOfficalName.get(standardizeString(guess));
        if (standardizedGuess == null)
            standardizedGuess = guess.trim();
        if (standardizedGuess && !stats.incorrectGuesses.includes(standardizedGuess)) {
            stats.incorrectGuesses.push(standardizedGuess);
        }
    }
    stats.percentCorrect = stats.numCorrectGuesses / stats.numTotalGuesses;
    localStorage.setItem(country, JSON.stringify(stats));
}
function getStats(country) {
    const statsString = localStorage.getItem(country);
    if (statsString) {
        return JSON.parse(statsString);
    }
    else {
        return null;
    }
}
function getFlagSetString() {
    return localStorage.getItem("flag-set") || "All flags";
}
function getFlagSet() {
    const flagSetString = getFlagSetString();
    if (flagSetString == "All flags") {
        return shuffle(Array.from(flags.keys()));
    }
    else if (flagSetString == "Nordic cross flags") {
        return shuffle([...nordicCrossFlags]);
    }
    else if (flagSetString == "Three stripe flags") {
        return shuffle([...threeStripeFlags]);
    }
    else if (flagSetString == "Hoist triangle flags") {
        return shuffle([...triangleOnHoistFlags]);
    }
    else {
        return [];
    }
}
function getMode() {
    return localStorage.getItem("mode") || "Show unseen mode";
}
function getShouldReshowUnknown() {
    return localStorage.getItem("shouldReshowUnknown") !== "false";
}
