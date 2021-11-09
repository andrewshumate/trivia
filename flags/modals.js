function showModal() {
    document.getElementById("input").style.display = "none";
    document.getElementById("submit-button").style.display = "none";

    document.getElementById("results").style.display = "revert";
    document.getElementById("next-button").style.display = "revert";

    document.getElementById("next-button").focus();
}

function showErrorModal(correctAnswer) {
    showModal();
    document.getElementById("results").innerHTML = `No you dumbass, it's <b>${correctAnswer}</b>`;
    document.getElementById("quiz-section").classList.add("error-animation");
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

    document.getElementById("quiz-section").classList.remove("error-animation");
    document.getElementById("quiz-section").classList.remove("success-animation");
}
