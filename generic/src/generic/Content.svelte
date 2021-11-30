<script lang="ts">
    import Results from "./Results.svelte";
    import Settings from "./Settings.svelte";
    import TopBar from "./TopBar.svelte";
    import * as storage from "./storage";
    import { QuestionSetHandler } from "./QuestionSetHandler";

    export let questionSetHandler: QuestionSetHandler;
    let numQuestionsAnswered: number;
    let numEligibleQuestions: number;
    let currentKey: string;
    let showSettings = false;
    let showResults = false;
    let stats: storage.Stats | null;
    let wasCorrectAnswer: boolean;

    const updateQuestion = (): void => {
        currentKey = questionSetHandler.getNextQuestion();
        numQuestionsAnswered = questionSetHandler.numNonReshownQuestionsAnswered;
        numEligibleQuestions = questionSetHandler.numEligibleQuestions;
    };

    const handleNext = (): void => {
        updateQuestion();
        showResults = false;
    };

    const handleSubmit = (event: Event): void => {
        const form = event.target as HTMLFormElement;
        const userInput = (form.input as HTMLInputElement).value;

        wasCorrectAnswer = questionSetHandler.isCorrectAnswer(currentKey, userInput);
        storage.setStats(currentKey, wasCorrectAnswer, userInput, questionSetHandler.getOfficialGuess);
        showResults = true;
        stats = storage.getStats(currentKey);
    };

    const handleSettingsClosed = (event: CustomEvent<boolean>): void => {
        const wasSettingsUpdated = event.detail;

        if (wasSettingsUpdated) {
            questionSetHandler.recalculateEligibleQuestions();
            updateQuestion();
            showResults = false;
        }

        showSettings = false;
    };

    const handleShowSettings = (): void => {
        showSettings = true;
    };

    questionSetHandler.recalculateEligibleQuestions();
    updateQuestion();
</script>

{#if showSettings}
    <Settings on:settingsClosed={handleSettingsClosed} {questionSetHandler} />
{/if}

<section
    id="quiz-section"
    class:success-animation={showResults && wasCorrectAnswer}
    class:error-animation={showResults && !wasCorrectAnswer}
>
    <TopBar {numQuestionsAnswered} {numEligibleQuestions} on:click={handleShowSettings} />
    <slot name="question" {currentKey} isResult={false} />
    {#if showResults}
        <Results {questionSetHandler} {wasCorrectAnswer} {currentKey} {stats} let:keys on:click={handleNext}>
            <slot name="answer" slot="answer" currentKey={keys} />
            <slot name="previous-answer" slot="previous-answer" currentKey={keys} />
        </Results>
    {:else}
        <!-- svelte-ignore a11y-autofocus -->
        <form on:submit|preventDefault={handleSubmit}>
            <input
                type="text"
                id="input"
                title="Guess the {questionSetHandler.questionType.toLowerCase()}"
                autocomplete="off"
                autofocus
            />
            <button id="submit-button">Submit</button>
        </form>
    {/if}
</section>

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
