window.onload = function () {
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", function() {
        const input = document.getElementById("input").innerText;
        
        if (Math.random() < 0.5) {
            showErrorModal("bad");
        } else {
            showSuccessModal();
        }
    }, false);
}
