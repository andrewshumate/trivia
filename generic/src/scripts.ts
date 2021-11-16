import { areStringsSimilar } from "./strings";
import { flags } from "./data";
import { shuffle, prefetchNextImages } from "./utils";
import * as storage from "./storage";
import * as binding from "./binding";

export let currentCountry: string;
export let eligibleCountries: string[];
export let numEligibleCountries: number;
export let numQuestionsAnswered = 0;

export function isCorrectAnswer(guess: string) {
    if (areStringsSimilar(currentCountry, guess)) return true;

    const alternateNames = flags.get(currentCountry)!.alternateNames;
    for (let i = 0; i < alternateNames.length; i++) {
        if (areStringsSimilar(alternateNames[i], guess)) return true;
    }

    return false;
}

export function getAndShowNextFlag() {
    let reshownCountry;
    if (numQuestionsAnswered % 5 == 0 && storage.getShouldReshowUnknown()) {
        const flagSet = storage.getFlagSet();
        for (let i = 0; i < flagSet.length; i++) {
            const stats = storage.getStats(flagSet[i]);
            if (stats && flagSet[i] != currentCountry && stats.percentCorrect < 0.6) {
                reshownCountry = flagSet[i];
                currentCountry = reshownCountry;
                break;
            }
        }
    }

    if (reshownCountry == null) {
        if (eligibleCountries.length == 0) recalculateEligibleCountries();
        currentCountry = eligibleCountries.pop()!;
    }

    numQuestionsAnswered = (numQuestionsAnswered + 1) % numEligibleCountries;
    binding.flagImage.src = flags.get(currentCountry)!.imageUrl;
    prefetchNextImages();
}

export function recalculateEligibleCountries() {
    const mode = storage.getMode();
    let flagSet = storage.getFlagSet();

    if (mode == "Show unseen mode") {
        const seenCountries = Object.keys(localStorage);
        flagSet = flagSet.filter((country) => !seenCountries.includes(country));
    } else if (mode == "Show unknown mode") {
        flagSet = flagSet.filter((country) => {
            const stats = storage.getStats(country);
            return stats
                ? stats.percentCorrect < 0.6 || stats.numCorrectGuesses < 2
                : true;
        });
    }

    if (flagSet.length == 0) {
        const allCountries = shuffle([...flags.keys()]);
        flagSet = allCountries;
    }

    eligibleCountries = flagSet;
    numEligibleCountries = eligibleCountries.length;
}

export function invalidateCounter() {
    document.getElementById("counter")!.innerHTML = `${numQuestionsAnswered}/${numEligibleCountries}`;
}

export function resetNumQuestionAnswered() {
    numQuestionsAnswered = 0;
}
