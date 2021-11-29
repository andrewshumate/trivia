<script lang="ts">
    import { questionSetHandler as x } from "./CarLogosQuestionSetHandler";
    import Content from "../generic/Content.svelte";
    import { convertKeyToOfficialGuess } from "./carLogoData";

    const questionSetHandler = x;
</script>

<Content {questionSetHandler} let:currentKey>
    <span slot="question">
        <img class="logo" src={currentKey} alt="Car logo" />
    </span>
    <span slot="answer">
        The answer is <b>{convertKeyToOfficialGuess(currentKey[0])}</b>
    </span>
    <span slot="previous-answer">
        {convertKeyToOfficialGuess(currentKey[0])}:
        <img class="mini-logo" src={currentKey[0]} alt="Car logo" />
    </span>
</Content>

<style>
    .logo {
        max-height: calc(100% - 114px);
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    .mini-logo {
        max-height: 50px;
        display: block;
    }
</style>
