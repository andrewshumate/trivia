<script lang="ts">
    import GenericImageApp from "../generic/generichandlers/GenericImageApp.svelte";

    let triviaCategory = "Movie poster";
    let questionType = "Movie name";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (PLANE_MOVIE_FILES as string[]).map((fileName) => `planemovies/images/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericImageApp {triviaCategory} {questionType} {files} />
