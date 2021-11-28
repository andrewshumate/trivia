<script lang="ts">
    import { questionSetHandler as x } from "./CarLogosQuestionSetHandler";
    import Content from "../generic/Content.svelte";

    const questionSetHandler = x;
</script>

<Content {questionSetHandler} let:currentKey>
    <span slot="question">
        <img src={currentKey} alt="Car logo" />
    </span>
    <span slot="answer">
        The answer is Ford! {currentKey[0]}
    </span>
</Content>

<style>
</style>
