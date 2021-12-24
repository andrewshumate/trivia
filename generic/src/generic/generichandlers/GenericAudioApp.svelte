<script lang="ts">
    import { GenericQuestionSetHandler } from "./GenericQuestionSetHandler";
    import Content from "../Content.svelte";

    export let triviaCategory: string;
    export let questionType: string;
    export let files: string[];

    const getAnswer = (keys: string[]): string => {
        return questionSetHandler.convertKeyToOfficialGuess(keys[0]);
    };

    const allData = ((): Map<string, string[]> => {
        const result: Map<string, string[]> = new Map();

        console.log(files);
        for (let i = 0; i < files.length; i++) {
            const questionKey = files[i];
            console.log(questionKey);
            const possibleAnswers = questionKey.split("/").reverse()[0].split(".")[0].split(",");
            result.set(questionKey, possibleAnswers);
        }

        return result;
    })();

    const questionSetHandler = new GenericQuestionSetHandler(triviaCategory, questionType, allData);
</script>

<Content {questionSetHandler} let:currentKey let:isResult>
    <span slot="question">
        <audio controls src={currentKey}>Your browser does not support the audio element.</audio>
    </span>
    <span slot="answer">
        The answer is <b>{getAnswer(currentKey)}</b>.
        {#if currentKey.length > 1}
            More photos:<br />
            {#each currentKey as imageSrc}
                {#if imageSrc !== currentKey[0]}
                    <img class="mini-image" src={imageSrc} alt={questionSetHandler.questionType} />
                {/if}
            {/each}
        {/if}
    </span>
    <span slot="previous-answer">
        {getAnswer(currentKey)}:<br />
        {#each currentKey as imageSrc}
            <img class="mini-image" src={imageSrc} alt={questionSetHandler.questionType} />
        {/each}
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
        margin-right: 1em;
    }
</style>
