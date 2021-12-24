<script lang="ts">
    import GenericAudioApp from "../generic/generichandlers/GenericAudioApp.svelte";

    let triviaCategory = "Audio";
    let questionType = "Artist - Song";
    /* eslint-disable no-undef */
    // @ts-expect-error This is a global defined in rollup.
    const files = (BOY_BAND_FILES as string[]).map((fileName) => `boy-bands/audio/${fileName}`);
    /* eslint-enable no-undef */
</script>

<GenericAudioApp {triviaCategory} {questionType} {files} />
