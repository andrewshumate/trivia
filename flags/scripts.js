let currentCountry;
let eligibleCountries = getEligibleCountries();

window.onload = function () {
    getFlag();
    document.getElementById("input").focus();

    // Submission listener
    const onSubmit = function() {
        const input = document.getElementById("input").value;
        if (isCorrectAnswer(input)) {
            setStats(currentCountry, true);
            showSuccessModal();
        } else {
            setStats(currentCountry, false, input);
            showErrorModal(currentCountry);
        }
    };
    const submitButton = document.getElementById("submit-button");
    submitButton.onclick = onSubmit;

    document.getElementById("input").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            onSubmit();
        }
    });

    // Next button listener
    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", function() {
        hideModal();
        getFlag();
    }, false);
}

function isCorrectAnswer(guess) {
    function areStringsSimilar(s1, s2) {
        const stringSimilarity = compareTwoStrings(standardizeString(s1), standardizeString(s2));
        if (stringSimilarity > 0.2) return true;
    }

    if (areStringsSimilar(guess, currentCountry)) return true;

    const alternateNames = flags[currentCountry].alternateNames;
    for (let i = 0; i < alternateNames.length ; i++) {
        if (areStringsSimilar(alternateNames[i], guess)) return true;
    }

    return false;
}

function getFlag() {
    // TODO implement the rest of the logic
    if (eligibleCountries.length == 0) {
        eligibleCountries = getEligibleCountries();
    }

    currentCountry = eligibleCountries.pop();
    document.getElementById("flag").src = flags[currentCountry].imageUrl;

    // Pre-fetch failure page images
    const stats = getStats(currentCountry);
    if (stats) {
        for (let i = 0; i < stats.incorrectGuesses.length; i++) {
            const country = flags[stats.incorrectGuesses[i]];
            if (country) {
                const image = new Image();
                image.src = country.imageUrl;
            }
        }
    }

    // Pre-fetch next image
    if (eligibleCountries.length >= 1) {
        const nextCountry = eligibleCountries[eligibleCountries.length - 1];
        const image = new Image();
        image.src = flags[nextCountry].imageUrl;
    }
}

function randomKey(obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

function standardizeString(string) {
    return string.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
}

function getEligibleCountries() {
    // TODO implement the rest of the logic
    return shuffle(Object.keys(flags));
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
