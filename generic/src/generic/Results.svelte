<script lang="ts">
    import { Stats } from "./storage";
    import { QuestionSetHandler } from "./QuestionSetHandler";

    export let questionSetHandler: QuestionSetHandler;

    export let wasCorrectAnswer: boolean;
    export let currentKey: string;
    export let stats: Stats | null;
</script>

<p id="results">
    {#if wasCorrectAnswer}
        Correct! <slot name="answer" keys={questionSetHandler.getAllAssociatedKeys(currentKey)} />
    {:else}
        Wrong! <slot name="answer" keys={questionSetHandler.getAllAssociatedKeys(currentKey)} />
    {/if}
</p>
<!-- svelte-ignore a11y-autofocus -->
<button id="next-button" on:click autofocus>Next</button>
<section id="additional-info">
    {#if stats}
        You've gotten this right <b>{stats.numCorrectGuesses}/{stats.numTotalGuesses}</b>
        (<b>{stats.percentCorrect * 100}%</b>) times.
        {#if stats.incorrectGuesses.length > 0}
            Previous guesses:
            <ul>
                {#each stats.incorrectGuesses as guess}
                    {#if questionSetHandler.doesGuessExist(guess)}
                        <li>
                            <slot name="previous-answer" keys={questionSetHandler.getKeysFromGuess(guess)} />
                        </li>
                    {:else}
                        <li>{guess} (not a {questionSetHandler.questionType.toLowerCase()})</li>
                    {/if}
                {/each}
            </ul>
        {/if}
    {/if}
</section>

<style>
    #results,
    #additional-info {
        margin: 12px 0px;
    }
    #results {
        padding-top: 0px;
        padding-bottom: 0px;
    }
</style>
