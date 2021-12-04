<script lang="ts">
    import { GenericImageQuestionSetHandler } from "./GenericImageQuestionSetHandler";
    import Content from "../Content.svelte";

    export let triviaCategory: string;
    export let questionType: string;
    export let files: string[];

    const questionSetHandler = new GenericImageQuestionSetHandler(triviaCategory, questionType, files);
    questionSetHandler.preload(files, 0);

    const getAnswer = (keys: string[]): string => {
        return questionSetHandler.convertKeyToOfficialGuess(keys[0]);
    };
</script>

<Content {questionSetHandler} let:currentKey>
    <span slot="question">
        <img class="image" src={currentKey} alt={questionSetHandler.questionType} />
    </span>
    <span slot="answer">
        The answer is <b>{getAnswer(currentKey)}</b>
    </span>
    <span slot="previous-answer">
        {getAnswer(currentKey)}:
        <img class="mini-image" src={currentKey[0]} alt={questionSetHandler.questionType} />
    </span>
</Content>

<style>
    .image {
        max-height: calc(100% - 114px);
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    .mini-image {
        max-width: 75px;
        display: block;
    }
</style>
