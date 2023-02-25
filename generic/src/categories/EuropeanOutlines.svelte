<script lang="ts">
    import GenericImageApp from "../generic/generichandlers/GenericImageApp.svelte";

    let triviaCategory = "Country outline";
    let questionType = "Country name";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (EUROPEAN_OUTLINE_FILES as string[]).map((fileName) => `european-outlines/images/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericImageApp {triviaCategory} {questionType} {files} />
