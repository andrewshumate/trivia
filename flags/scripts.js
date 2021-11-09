let currentCountry;

window.onload = function () {
    // Load up the first county
    getFlag();

    // Submission listener
    const onSubmit = function() {
        const input = document.getElementById("input").value;
        
        if (input == currentCountry) {
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

function getFlag() {
    // TODO implement the rest of the logic
    currentCountry = randomKey(flags);
    document.getElementById("flag").src = flags[currentCountry];
}

function randomKey(obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};
