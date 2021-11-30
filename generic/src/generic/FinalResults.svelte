<script lang="ts">
    export let numQuestionsCorrect: number;
    export let numQuestionsTotal: number;
</script>

<section id="final-results-section">
    You got {numQuestionsCorrect} out of {numQuestionsTotal}
    ({(numQuestionsCorrect / numQuestionsTotal).toFixed()}) correct!

    <button on:click>Continue</button>
</section>

<style>
    #final-results-section {
        background: var(--background);
        height: 100%;
        width: 100%;
        max-width: calc(500px - 1px);
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
    }
</style>
