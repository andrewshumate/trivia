<script lang="ts">
    import GenericImageApp from "../generic/generichandlers/GenericImageApp.svelte";
    let triviaCategory = "State outlines";
    let questionType = "State names";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (TWO_STATE_OUTLINES_FILES as string[]).map((fileName) => `two-state-outlines/images/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericImageApp {triviaCategory} {questionType} {files} />
