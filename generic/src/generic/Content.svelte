<script lang="ts">
    import Results from "./Results.svelte";
    import Settings from "./Settings.svelte";
    import TopBar from "./TopBar.svelte";
    import * as storage from "./storage";
    import { shuffle } from "./utils";

    ///////////////////////////////////////////////////////
    // BEGIN GENERIC //////////////////////////////////////
    ///////////////////////////////////////////////////////
    interface QuestionSet {
        description: string;
        questions: string[];
    }

    export let isCorrectAnswer: (expected: string, actual: string) => boolean;
    // export let getNextQuestion: (numQuestionsAnswered: number, currentQuestion?: string) => string;
    export let doesGuessExist: (guess: string) => boolean;

    export let getQuestionSets: () => QuestionSet[];

    /** Represents what the user is trying to guess. e.g. "Guess the `questionType`" */
    export let questionType: string;

    ///////////////////////////////////////////////////////
    // END ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////
    let eligibleQuestions: string[];

    const getQuestionSet = (questionSetString: string): string[] => {
        const questionSets = getQuestionSets();
        for (let i = 0; i < questionSets.length; i++) {
            if (questionSetString === questionSets[i].description) {
                return shuffle([...questionSets[i].questions]);
            }
        }
        throw new Error(`Invalid question set ${questionSetString}`);
    };

    /** Returns length of new eligible questions list */
    const recalculateEligibleQuestions = (): number => {
        const mode = storage.getMode();
        let questionSet = getQuestionSet(storage.getQuestionSetString());

        if (mode == "Show unseen mode") {
            const seenQuestions = Object.keys(localStorage);
            questionSet = questionSet.filter((question) => !seenQuestions.includes(question));
        } else if (mode == "Show unknown mode") {
            questionSet = questionSet.filter((question) => {
                const stats = storage.getStats(question);
                return stats ? stats.percentCorrect < 0.6 || stats.numCorrectGuesses < 2 : true;
            });
        }

        if (questionSet.length == 0) {
            const allQuestions = shuffle(getQuestionSet("All"));
            questionSet = allQuestions;
        }

        eligibleQuestions = questionSet;
        return eligibleQuestions.length;
    };

    const getNextQuestion = (numQuestionsAnswered: number, currentQuestion?: string): string => {
        let result: string;

        if (numQuestionsAnswered % 5 == 0 && storage.getShouldReshowUnknown()) {
            const questionSet = getQuestionSet(storage.getQuestionSetString());
            for (let i = 0; i < questionSet.length; i++) {
                const stats = storage.getStats(questionSet[i]);
                if (stats && questionSet[i] != currentQuestion && stats.percentCorrect < 0.6) {
                    result = questionSet[i];
                    _prefetchNextImages(result);
                    return result;
                }
            }
        }

        if (eligibleQuestions.length == 0) recalculateEligibleQuestions();
        result = eligibleQuestions.pop()!;
        _prefetchNextImages(result);
        return result;
    };

    const _prefetchNextImages = (currentQuestion: string): void => {
        console.log(currentQuestion);
        // // Pre-fetch failure page images
        // const stats = storage.getStats(currentQuestion);
        // if (stats) {
        //     const allQuestions = getQuestionSet("All");
        //     for (let i = 0; i < stats.incorrectGuesses.length; i++) {
        //         const isValid = allQuestions.includes(stats.incorrectGuesses[i]);
        //         if (isValid) {
        //             const image = new Image();
        //             image.src = country.imageUrl;
        //         }
        //     }
        // }

        // // Pre-fetch next image
        // if (eligibleQuestions.length >= 1) {
        //     const nextCountry = eligibleQuestions[eligibleQuestions.length - 1];
        //     const image = new Image();
        //     // image.src = flags.get(nextCountry)!.imageUrl;
        // }
    };

    ///////////////////////////////////////////////////
    // REST STUFF /////////////////////////////////////
    ///////////////////////////////////////////////////

    let numQuestionsAnswered = 0;
    let numEligibleQuestions = recalculateEligibleQuestions();
    let currentQuestion = getNextQuestion(numQuestionsAnswered);

    let showSettings = false;
    let showResults = false;
    let stats: storage.Stats | null;
    let wasCorrectAnswer: boolean;

    const handleNext = (): void => {
        numQuestionsAnswered = (numQuestionsAnswered + 1) % numEligibleQuestions;
        currentQuestion = getNextQuestion(numQuestionsAnswered, currentQuestion);
        showResults = false;
    };

    const handleSubmit = (event: Event): void => {
        const form = event.target as HTMLFormElement;
        const userInput = (form.input as HTMLInputElement).value;

        wasCorrectAnswer = isCorrectAnswer(currentQuestion, userInput);
        storage.setStats(currentQuestion, wasCorrectAnswer, userInput);
        showResults = true;
        stats = storage.getStats(currentQuestion);
    };

    const handleSettingsClosed = (event: CustomEvent<boolean>): void => {
        const wasSettingsUpdated = event.detail;

        if (wasSettingsUpdated) {
            numEligibleQuestions = recalculateEligibleQuestions();
            currentQuestion = getNextQuestion(numQuestionsAnswered, currentQuestion);
            numQuestionsAnswered = 0;
            showResults = false;
        }

        showSettings = false;
    };

    const handleShowSettings = (): void => {
        showSettings = true;
    };

    recalculateEligibleQuestions();
</script>

<main>
    {#if showSettings}
        <Settings on:settingsClosed={handleSettingsClosed} {getQuestionSets} />
    {/if}

    <section
        id="quiz-section"
        class:success-animation={showResults && wasCorrectAnswer}
        class:error-animation={showResults && !wasCorrectAnswer}
    >
        <TopBar {numQuestionsAnswered} {numEligibleQuestions} on:click={handleShowSettings} />
        <slot name="question" {currentQuestion} isResult={false} />
        {#if showResults}
            <Results
                {doesGuessExist}
                {wasCorrectAnswer}
                {currentQuestion}
                {questionType}
                {stats}
                let:guess
                on:click={handleNext}
            >
                <slot name="question" slot="question" currentQuestion={guess} isResult={true} />
            </Results>
        {:else}
            <!-- svelte-ignore a11y-autofocus -->
            <form on:submit|preventDefault={handleSubmit}>
                <input
                    type="text"
                    id="input"
                    title="Guess the {questionType.toLowerCase()}"
                    autocomplete="off"
                    autofocus
                />
                <button id="submit-button">Submit</button>
            </form>
        {/if}
    </section>
</main>

<style>
    :root {
        color-scheme: light dark;
    }
    @media (prefers-color-scheme: dark) {
        :root {
            --background-background: black;
            --background: #272727;
            --foreground: white;
            --success: #1b5e20;
            --failure: #b71c1c;
        }
    }
    @media (prefers-color-scheme: light) {
        :root {
            --background-background: white;
            --background: #cfd8dc;
            --foreground: black;
            --success: #4caf50;
            --failure: #f44336;
        }
    }

    :global(html),
    :global(body) {
        height: 100%;
        margin: 0;
    }
    :global(label) {
        display: block;
    }
    :global(input),
    :global(button) {
        box-sizing: border-box;
        border: solid darkgray 1px;
    }
    :global(button) {
        width: 100%;
        height: 35px;
        border-radius: 7px;
        cursor: pointer;
    }

    main {
        padding: 0;
        height: 100%;
        max-width: 500px;
        margin: auto;
        background: var(--background-background);
        color: var(--foreground);
        font-family: sans-serif;
    }
    #quiz-section {
        background: var(--background);
        height: calc(100% - 24px);
        padding: 12px;
    }
    input[type="text"] {
        height: 35px;
        border-radius: 7px;
    }
    input[type="text"] {
        width: calc(100%);
        margin-top: 12px;
        margin-bottom: 12px;
        padding-left: 7px;
    }
    #input {
        padding-top: 0px;
        padding-bottom: 0px;
    }

    @keyframes error-animation {
        from {
            background-color: var(--failure);
        }
        to {
            background-color: var(--background);
        }
    }
    .error-animation {
        animation-name: error-animation;
        animation-duration: 1.5s;
    }
    @keyframes success-animation {
        from {
            background-color: var(--success);
        }
        to {
            background-color: var(--background);
        }
    }
    .success-animation {
        animation-name: success-animation;
        animation-duration: 1.5s;
    }
</style>
