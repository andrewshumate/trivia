<script lang="ts">
    import Content from "./generic/Content.svelte";
    import { areStringsSimilar } from "./generic/strings";
    import { flags } from "./data";
    import * as storage from "./generic/storage";
    import { shuffle } from "./generic/utils";

    const questionType = "Country";
    let eligibleCountries: string[];

    const isCorrectAnswer = (currentQuestion: string, guess: string): boolean => {
        if (areStringsSimilar(currentQuestion, guess)) return true;

        const alternateNames = flags.get(currentQuestion)!.alternateNames;
        for (let i = 0; i < alternateNames.length; i++) {
            if (areStringsSimilar(alternateNames[i], guess)) return true;
        }

        return false;
    };

    const getNextQuestion = (numQuestionsAnswered: number, currentQuestion?: string): string => {
        let result: string;

        if (numQuestionsAnswered % 5 == 0 && storage.getShouldReshowUnknown()) {
            const flagSet = storage.getFlagSet();
            for (let i = 0; i < flagSet.length; i++) {
                const stats = storage.getStats(flagSet[i]);
                if (stats && flagSet[i] != currentQuestion && stats.percentCorrect < 0.6) {
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

    const doesGuessExist = (guess: string): boolean => {
        return flags.get(guess) != undefined;
    };

    const _prefetchNextImages = (currentQuestion: string): void => {
        // Pre-fetch failure page images
        const stats = storage.getStats(currentQuestion);
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

    recalculateEligibleQuestions();
</script>

<!-- Ignore this error: https://stackoverflow.com/questions/65906478/ -->
<Content
    {isCorrectAnswer}
    {recalculateEligibleQuestions}
    {getNextQuestion}
    {doesGuessExist}
    {questionType}
    let:currentQuestion
    let:isResult
>
    <span slot="question">
        <img
            class:flag={!isResult}
            class:mini-flags={isResult}
            alt="{questionType} flag"
            src={flags.get(currentQuestion)?.imageUrl}
        />
    </span>
</Content>

<style>
    .flag {
        max-height: calc(100% - 114px);
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    .mini-flags {
        max-height: 50px;
        display: block;
    }
</style>
