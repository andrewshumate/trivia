<script lang="ts">
    import { GenericImageQuestionSetHandler } from "./GenericImageQuestionSetHandler";
    import Content from "../Content.svelte";

    export let triviaCategory: string;
    export let questionType: string;
    export let files: string[];

    const getAnswer = (keys: string[]): string => {
        return questionSetHandler.convertKeyToOfficialGuess(keys[0]);
    };

    const allData = ((): Map<string, string[]> => {
        const result: Map<string, string[]> = new Map();

        for (let i = 0; i < files.length; i++) {
            const questionKey = files[i];
            const possibleAnswers = questionKey.split("/")[2].split(".")[0].split(",");
            result.set(questionKey, possibleAnswers);
        }

        return result;
    })();

    const questionSetHandler = new GenericImageQuestionSetHandler(triviaCategory, questionType, allData);
    questionSetHandler.preload(files, 0);
</script>

<Content {questionSetHandler} let:currentKey let:isResult>
    <span slot="question">
        <img class="image" class:medium-image={isResult} src={currentKey} alt={questionSetHandler.questionType} />
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
    .medium-image {
        max-height: 300px;
    }
    .mini-image {
        max-width: 75px;
        display: block;
    }
</style>
