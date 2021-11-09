let currentCountry;

window.onload = function () {
    getFlag();
    document.getElementById("input").focus();

    // Submission listener
    const onSubmit = function() {
        const input = document.getElementById("input").value;
        if (isCorrectAnswer(input)) {
            showSuccessModal();
        } else {
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
    currentCountry = randomKey(flags);
    document.getElementById("flag").src = flags[currentCountry].imageUrl;
}

function randomKey(obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

function standardizeString(string) {
    return string.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
}
