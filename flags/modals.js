function showErrorModal() {
    document.getElementById("input").style.display = "none";
    document.getElementById("submit-button").style.display = "none";

    document.getElementById("results").style.display = "revert";
    document.getElementById("next-button").style.display = "revert";

    document.getElementById("quiz-section").classList.add("error-animation");
}

function hideErrorModal() {
    document.getElementById("input").style.display = "revert";
    document.getElementById("submit-button").style.display = "revert";

    document.getElementById("results").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    document.getElementById("quiz-section").classList.remove("error-animation");
}