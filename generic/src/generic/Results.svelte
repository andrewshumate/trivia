<script lang="ts">
    import { flags } from "../data";
    import { Stats } from "./storage";

    export let questionType: string;
    export let wasCorrectAnswer: boolean;
    export let currentQuestion: string;
    export let stats: Stats | null;
</script>

<p id="results">
    {#if wasCorrectAnswer}
        Correct!
    {:else}
        No, it's <b>{currentQuestion}.</b>
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
                    {#if flags.get(guess)}
                        <li>
                            {guess}. This is the {guess}
                            {questionType.toLowerCase()}:
                            <slot name="question" {guess} />
                        </li>
                    {:else}
                        <li>{guess} (not a {questionType.toLowerCase()})</li>
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
