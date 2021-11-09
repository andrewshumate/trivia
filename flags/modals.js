function showErrorModal(correctAnswer) {
    document.getElementById("results").innerHTML = `No you dumbass, it's <b>${correctAnswer}</b>`;

    document.getElementById("input").style.display = "none";
    document.getElementById("submit-button").style.display = "none";

    document.getElementById("results").style.display = "revert";
    document.getElementById("next-button").style.display = "revert";

    document.getElementById("quiz-section").classList.add("error-animation");
}

function showSuccessModal() {
    document.getElementById("results").innerHTML = `Correct!`;

    document.getElementById("input").style.display = "none";
    document.getElementById("submit-button").style.display = "none";

    document.getElementById("results").style.display = "revert";
    document.getElementById("next-button").style.display = "revert";

    document.getElementById("quiz-section").classList.add("success-animation");
    document.getElementById("results").innerHTML = `Correct!`;
}

function hideModal() {
    document.getElementById("input").style.display = "revert";
    document.getElementById("submit-button").style.display = "revert";

    document.getElementById("results").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    document.getElementById("quiz-section").classList.remove("error-animation");
    document.getElementById("quiz-section").classList.remove("success-animation");
}