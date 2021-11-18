import { getStats } from "./storage";
import { flags } from "./data";
import { eligibleCountries } from "./scripts";

export const shuffle = <T>(array: Array<T>): Array<T> => {
    let currentIndex = array.length;
    let randomIndex: number;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

export const prefetchNextImages = (currentCountry: string): void => {
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
        image.src = flags.get(nextCountry)!.imageUrl;
    }
};
