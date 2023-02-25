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

    // Workaround for iOS: https://github.com/andrewshumate/trivia/issues/1
    let visualViewportHeight = visualViewport.height;
    visualViewport.onresize = (): void => {
        visualViewportHeight = visualViewport.height;
        window.scrollTo(0, 0);
    };
    window.onscroll = (): void => {
        window.scrollTo(0, 0);
    };
</script>

<Content {questionSetHandler} let:currentKey let:isResult>
    <span slot="question">
        <img
            class="image"
            style={`max-height: calc(${visualViewportHeight}px - 145px)`}
            class:medium-image={isResult}
            src={currentKey}
            alt={questionSetHandler.questionType}
        />
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
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    .medium-image {
        max-height: 300px !important;
    }
    .mini-image {
        max-width: 75px;
        margin-right: 1em;
    }
</style>
