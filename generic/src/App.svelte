<script lang="ts">
    import Results from "./Results.svelte";
    import Settings from "./Settings.svelte";
    import TopBar from "./TopBar.svelte";
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
        <TopBar {numQuestionsAnswered} {numEligibleCountries} on:click={handleShowSettings} />
        <img id="flag" alt="Country flag" src={flags.get(currentCountry)?.imageUrl} />
        {#if showResults}
            <Results {wasCorrectAnswer} {currentCountry} {stats} on:click={handleNext} />
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
