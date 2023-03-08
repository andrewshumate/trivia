<script lang="ts">
    import { GenericQuestionSetHandler } from "./GenericQuestionSetHandler";
    import Content from "../Content.svelte";

    export let questionType: string;
    export let answerType: string;
    export let allData: Map<string, string[]>;

    const questionSetHandler = new GenericQuestionSetHandler(questionType, answerType, allData);

    const getAnswers = (keys: string[]): string[] => {
        return questionSetHandler.convertKeyToOfficialGuesses(keys[0]);
    };

    // TODO make this not bad. Behavior may or may not be correct for all categories.
    const getPreviousAnswers = (currentKey: string[]): string[] => {
        const question = getAnswers(currentKey)[0];
        return allData.get(question);
    };
</script>

<Content {questionSetHandler} let:currentKey>
    <slot name="question" slot="question" {currentKey} isResult={false}>
        <p>{currentKey}</p>
    </slot>
    <slot name="answer" slot="answer">
        The answer is:
        <ul>
            {#each getAnswers(currentKey) as answer}
                <li>{answer}</li>
            {/each}
        </ul>
    </slot>
    <slot name="previous-answer" slot="previous-answer" {currentKey}>
        {getAnswers(currentKey)[0]}:
        <ul>
            {#each getPreviousAnswers(currentKey) as answer}
                <li>{answer}</li>
            {/each}
        </ul>
    </slot>
</Content>
