let currentCountry;
let eligibleCountries;

window.onload = function () {
    recalculateEligibleCountries();
    getFlag();
    document.getElementById("input").focus();

    // Submission listener
    const onSubmit = function () {
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

    document.getElementById("input").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            onSubmit();
        }
    });

    // Next button listener
    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener(
        "click",
        function () {
            hideModal();
            getFlag();
        },
        false
    );
};

function isCorrectAnswer(guess) {
    function areStringsSimilar(s1, s2) {
        const stringSimilarity = getStringSimilarity(standardizeString(s1), standardizeString(s2));
        if (stringSimilarity >= 0.6) return true;
    }

    if (areStringsSimilar(guess, currentCountry)) return true;

    const alternateNames = flags[currentCountry].alternateNames;
    for (let i = 0; i < alternateNames.length; i++) {
        if (areStringsSimilar(alternateNames[i], guess)) return true;
    }

    return false;
}

let seenCount = 0;
function getFlag() {
    seenCount++;
    if (eligibleCountries.length == 0) {
        recalculateEligibleCountries();
    }

    if (seenCount % 5 == 0 && getShouldReshowUnknown()) {
        const keys = shuffle(Object.keys(localStorage));
        for (let i = 0; keys.length; i++) {
            const stats = getStats(keys[i]);
            if (stats && keys[i] != currentCountry && stats.percentCorrect < 0.6) {
                currentCountry = keys[i];
                break;
            }
        }
    } else {
        currentCountry = eligibleCountries.pop();
    }
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
    return keys[(keys.length * Math.random()) << 0];
}

function standardizeString(string) {
    return string.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
}

function recalculateEligibleCountries() {
    const temp = shuffle(Object.keys(flags));
    const mode = getMode();

    console.log("mode is " + mode);
    if (mode == "Show all mode") {
        eligibleCountries = temp;
    } else if (mode == "Show unseen mode") {
        const keys = Object.keys(localStorage);
        eligibleCountries = temp.filter(function (x) {
            return keys.indexOf(x) < 0;
        });
    } else if (mode == "Show unknown mode") {
        const keys = Object.keys(flags);
        eligibleCountries = keys.filter((key) => {
            if (getStats(key)) {
                return getStats(key).percentCorrect < 0.6;
            } else {
                return false;
            }
        });
    }

    if (eligibleCountries.length == 0) {
        console.log("Before" + eligibleCountries);
        eligibleCountries = temp;
        console.log("After" + eligibleCountries);
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
