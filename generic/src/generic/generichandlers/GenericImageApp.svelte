<script lang="ts">
    import { GenericQuestionSetHandler } from "./GenericQuestionSetHandler";
    import Content from "../Content.svelte";

    export let triviaCategory: string;
    export let questionType: string;
    export let files: string[];

    const getAnswer = (keys: string[]): string => {
        return questionSetHandler.convertKeyToOfficialGuess(keys[0]);
    };

    const preload = (imageArray: string[], index: number): void => {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            const img = new Image();
            img.onload = (): void => {
                preload(imageArray, index + 1);
            };

            img.src = imageArray[index];
        }
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

    const questionSetHandler = new GenericQuestionSetHandler(triviaCategory, questionType, allData);
    preload(files, 0);
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
