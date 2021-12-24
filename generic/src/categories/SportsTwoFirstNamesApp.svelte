<script lang="ts">
    import GenericImageApp from "../generic/generichandlers/GenericImageApp.svelte";

    let triviaCategory = "Sports celeb";
    let questionType = "Sports celeb name";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (SPORTS_TWO_FIRST_NAMES as string[]).map((fileName) => `sports-two-first-names/images/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericImageApp {triviaCategory} {questionType} {files} />
