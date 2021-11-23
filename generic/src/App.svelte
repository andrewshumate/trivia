<script lang="ts">
    import Content from "./generic/Content.svelte";
    import { areStringsSimilar } from "./generic/strings";
    import { flags } from "./data";
    import * as storage from "./generic/storage";
    import { shuffle } from "./generic/utils";

    let eligibleCountries: string[];

    const isCorrectAnswer = (currentCountry: string, guess: string): boolean => {
        if (areStringsSimilar(currentCountry, guess)) return true;

        const alternateNames = flags.get(currentCountry)!.alternateNames;
        for (let i = 0; i < alternateNames.length; i++) {
            if (areStringsSimilar(alternateNames[i], guess)) return true;
        }

        return false;
    };

    const getNextQuestion = (numQuestionsAnswered: number, currentCountry?: string): string => {
        let result: string;

        if (numQuestionsAnswered % 5 == 0 && storage.getShouldReshowUnknown()) {
            const flagSet = storage.getFlagSet();
            for (let i = 0; i < flagSet.length; i++) {
                const stats = storage.getStats(flagSet[i]);
                if (stats && flagSet[i] != currentCountry && stats.percentCorrect < 0.6) {
                    result = flagSet[i];
                    _prefetchNextImages(result);
                    return result;
                }
            }
        }

        if (eligibleCountries.length == 0) recalculateEligibleQuestions();
        result = eligibleCountries.pop()!;
        _prefetchNextImages(result);
        return result;
    };

    /** Returns length of new eligible countries list */
    const recalculateEligibleQuestions = (): number => {
        const mode = storage.getMode();
        let flagSet = storage.getFlagSet();

        if (mode == "Show unseen mode") {
            const seenCountries = Object.keys(localStorage);
            flagSet = flagSet.filter((country) => !seenCountries.includes(country));
        } else if (mode == "Show unknown mode") {
            flagSet = flagSet.filter((country) => {
                const stats = storage.getStats(country);
                return stats ? stats.percentCorrect < 0.6 || stats.numCorrectGuesses < 2 : true;
            });
        }

        if (flagSet.length == 0) {
            const allCountries = shuffle([...flags.keys()]);
            flagSet = allCountries;
        }

        eligibleCountries = flagSet;
        return eligibleCountries.length;
    };

    const _prefetchNextImages = (currentCountry: string): void => {
        // Pre-fetch failure page images
        const stats = storage.getStats(currentCountry);
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
</script>

<Content {isCorrectAnswer} {recalculateEligibleQuestions} {getNextQuestion} questionType="Country" />
