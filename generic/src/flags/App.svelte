<script lang="ts">
    import { flags } from "./data";
    import { questionSetHandler as x } from "./FlagQuestionSetHandler";
    import Content from "../generic/Content.svelte";

    const questionSetHandler = x;
</script>

<!-- Ignore this error: https://stackoverflow.com/questions/65906478/ -->
<Content {questionSetHandler} let:currentQuestion let:isResult>
    <span slot="question">
        <img
            class:flag={!isResult}
            class:mini-flags={isResult}
            alt="{questionSetHandler.questionType} flag"
            src={flags.get(currentQuestion)?.imageUrl}
        />
    </span>
</Content>

<style>
    .flag {
        max-height: calc(100% - 114px);
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    .mini-flags {
        max-height: 50px;
        display: block;
    }
</style>
