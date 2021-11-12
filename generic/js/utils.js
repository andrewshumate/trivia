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
function randomKey(obj) {
    var keys = Object.keys(obj);
    return keys[(keys.length * Math.random()) << 0];
}
function prefetchNextImages() {
    // Pre-fetch failure page images
    const stats = getStats(currentCountry);
    if (stats) {
        for (let i = 0; i < stats.incorrectGuesses.length; i++) {
            const country = flags.get(stats.incorrectGuesses[i]);
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
        image.src = flags.get(nextCountry).imageUrl;
    }
}
