<script lang="ts">
    import GenericImageApp from "../generic/generichandlers/GenericImageApp.svelte";

    let triviaCategory = "Car logos";
    let questionType = "Car brand";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (CAR_LOGO_FILES as string[]).map((fileName) => `carlogos/images/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericImageApp {triviaCategory} {questionType} {files} />
