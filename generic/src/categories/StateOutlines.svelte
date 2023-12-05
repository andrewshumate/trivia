<script lang="ts">
    import GenericImageApp from "../generic/generichandlers/GenericImageApp.svelte";
    let triviaCategory = "State outline";
    let questionType = "State name";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (STATE_OUTLINES_FILES as string[]).map((fileName) => `state-outlines/images/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericImageApp {triviaCategory} {questionType} {files} />
