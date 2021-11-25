<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import * as storage from "./storage";

    interface QuestionSet {
        description: string;
        questions: string[];
    }

    export let getQuestionSets: () => QuestionSet[];

    let dispatch = createEventDispatcher();

    let oldQuestionSet = storage.getQuestionSetString();
    let oldQuestionsToFilterOut = storage.getMode();

    let questionSetValue = oldQuestionSet;
    let questionsToFilterOut = oldQuestionsToFilterOut;
    let reshowQuestions = storage.getShouldReshowUnknown();

    const handleSaveSettings = (): void => {
        const wasSettingsUpdated =
            questionSetValue != oldQuestionSet || questionsToFilterOut != oldQuestionsToFilterOut;

        if (wasSettingsUpdated) {
            localStorage.setItem("question-set", questionSetValue);
            localStorage.setItem("mode", questionsToFilterOut);
        }

        dispatch("settingsClosed", wasSettingsUpdated);
    };
</script>

<section id="settings-section">
    <form>
        <p class="settings-category"><b>Question set</b></p>
        {#each getQuestionSets() as questionSet}
            <label for={questionSet.description}>
                <input
                    type="radio"
                    id={questionSet.description}
                    name="question-set"
                    value={questionSet.description}
                    bind:group={questionSetValue}
                />
                {questionSet.description} ({questionSet.questions.length})
            </label>
        {/each}

        <p class="settings-category"><b>Filter out</b></p>
        <label for="show-all-mode">
            <input
                type="radio"
                id="show-all-mode"
                name="mode"
                value="Show all mode"
                bind:group={questionsToFilterOut}
            />
            Do not hide any questions
        </label>
        <label for="show-unseen-mode">
            <input
                type="radio"
                id="show-unseen-mode"
                name="mode"
                value="Show unseen mode"
                bind:group={questionsToFilterOut}
            />
            Hide questions I've already seen
        </label>
        <label for="show-unknown-mode">
            <input
                type="radio"
                id="show-unknown-mode"
                name="mode"
                value="Show unknown mode"
                bind:group={questionsToFilterOut}
            />
            Hide questions I've gotten right >60% of the time
        </label>

        <p class="settings-category"><b>Extra settings</b></p>
        <label for="reshow-unknown">
            <input
                type="checkbox"
                id="reshow-unknown"
                name="reshow-unknwon"
                value="Re-show unknown"
                bind:checked={reshowQuestions}
            />
            Show questions I've gotten wrong more often
        </label>
        <button on:click|preventDefault={handleSaveSettings} id="exit">Exit</button>
    </form>
</section>

<style>
    #settings-section {
        background: var(--background);
        height: 100%;
        width: 100%;
        max-width: calc(500px - 1px);
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
    }
    input[type="radio"],
    input[type="checkbox"] {
        margin: 0 6px;
    }
    label {
        padding-bottom: 16px;
    }
    .settings-category {
        margin: 0 0 5px 5px;
    }
    form {
        padding: 12px;
    }
</style>
