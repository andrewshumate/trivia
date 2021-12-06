<script lang="ts">
    import { GenericQuestionSetHandler } from "./GenericQuestionSetHandler";
    import Content from "../Content.svelte";

    export let questionType: string;
    export let answerType: string;
    export let allData: Map<string, string[]>;

    const questionSetHandler = new GenericQuestionSetHandler(questionType, answerType, allData);

    const getAnswer = (keys: string[]): string => {
        return questionSetHandler.convertKeyToOfficialGuess(keys[0]);
    };
</script>

<Content {questionSetHandler} let:currentKey>
    <slot name="question" slot="question" {currentKey} isResult={false}>
        <p>{currentKey}</p>
    </slot>
    <slot name="answer" slot="answer">
        The answer is <b>{getAnswer(currentKey)}</b>
    </slot>
    <slot name="previous-answer" slot="previous-answer" {currentKey}>
        {getAnswer(currentKey)}:
        {currentKey[0]}
    </slot>
</Content>
