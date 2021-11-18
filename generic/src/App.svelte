<script lang="ts">
    import Results from "./Results.svelte";
    import Settings from "./Settings.svelte";
    import * as storage from "./storage";
    import { flags } from "./data";
    import { recalculateEligibleCountries, getAndShowNextFlag, isCorrectAnswer } from "./scripts";

    let numQuestionsAnswered = 0;
    let numEligibleCountries = recalculateEligibleCountries();
    let currentCountry = getAndShowNextFlag(numQuestionsAnswered);

    let showSettings = false;
    let showResults = false;
    let stats: storage.Stats | null = null;
    let wasCorrectAnswer: boolean;

    const handleNext = (): void => {
        numQuestionsAnswered = (numQuestionsAnswered + 1) % numEligibleCountries;
        currentCountry = getAndShowNextFlag(numQuestionsAnswered, currentCountry);
        showResults = false;
    };

    const handleSubmit = (event: Event): void => {
        const form = event.target as HTMLFormElement;
        const userInput = (form.input as HTMLInputElement).value;

        wasCorrectAnswer = isCorrectAnswer(currentCountry, userInput);
        storage.setStats(currentCountry, wasCorrectAnswer, userInput);
        showResults = true;
        stats = storage.getStats(currentCountry);
    };

    const handleSettingsClosed = (event: CustomEvent<boolean>): void => {
        const wasSettingsUpdated = event.detail;

        if (wasSettingsUpdated) {
            numEligibleCountries = recalculateEligibleCountries();
            currentCountry = getAndShowNextFlag(numQuestionsAnswered, currentCountry);
            numQuestionsAnswered = 0;
            showResults = false;
        }

        showSettings = false;
    };

    const handleShowSettings = (): void => {
        showSettings = true;
    };
</script>

<main>
    {#if showSettings}
        <Settings on:settingsClosed={handleSettingsClosed} />
    {/if}

    <section id="quiz-section">
        <section id="top-bar">
            <p id="counter">{numQuestionsAnswered}/{numEligibleCountries}</p>

            <svg
                id="settings-icon"
                on:click={handleShowSettings}
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
            >
                <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                    <path
                        d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
                    />
                </g>
            </svg>
        </section>
        <img id="flag" alt="Country flag" src={flags.get(currentCountry)?.imageUrl} />
        {#if showResults}
            <Results
                wasCorrectAnswer={wasCorrectAnswer}
                currentCountry={currentCountry}
                stats={stats}
                on:click={handleNext}
            />
        {:else}
            <!-- svelte-ignore a11y-autofocus -->
            <form on:submit|preventDefault={handleSubmit}>
                <input type="text" id="input" title="Guess the country" autocomplete="off" autofocus />
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
    :global(body) {
        margin: 0;
        padding: 0;
    }
    main {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: sans-serif;
        max-width: 500px;
        margin: auto;
        background: var(--background-background);
        color: var(--foreground);
    }
    #quiz-section {
        background: var(--background);
        height: calc(100% - 24px);
        padding: 12px;
    }
    input[type="text"],
    button {
        height: 35px;
        border-radius: 7px;
    }
    input[type="text"] {
        width: calc(100%);
        margin-top: 12px;
        margin-bottom: 12px;
        padding-left: 7px;
    }
    button {
        width: 100%;
    }
    #flag {
        max-height: calc(100% - 35px - 12px - 35px - 12px - 2px - 5px - 12px);
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    #input {
        padding-top: 0px;
        padding-bottom: 0px;
    }
    #settings-icon {
        float: right;
        margin: -2px -3px 0 0;
        height: 18px;
    }
    svg {
        fill: var(--foreground);
    }
    #counter {
        opacity: 50%;
        margin: 0;
        font-size: 12px;
        width: fit-content;
        float: left;
    }
    #top-bar {
        height: 24px;
    }
    :global(.mini-flags) {
        max-height: 50px;
        display: block;
    }
    @keyframes -global-error-animation {
        from {
            background-color: var(--failure);
        }
        to {
            background-color: var(--background);
        }
    }
    :global(.error-animation) {
        animation-name: error-animation;
        animation-duration: 1.5s;
    }
    @keyframes -global-success-animation {
        from {
            background-color: var(--success);
        }
        to {
            background-color: var(--background);
        }
    }
    :global(.success-animation) {
        animation-name: success-animation;
        animation-duration: 1.5s;
    }
</style>
