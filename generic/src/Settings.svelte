<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import * as storage from "./storage";

    let dispatch = createEventDispatcher();

    let oldFlagSet = storage.getFlagSetString();
    let oldFlagsToFilterOut = storage.getMode();

    let flagSet = oldFlagSet;
    let flagsToFilterOut = oldFlagsToFilterOut;
    let reshowFlags = storage.getShouldReshowUnknown();

    const handleSaveSettings = (): void => {
        const wasSettingsUpdated = flagSet != oldFlagSet || flagsToFilterOut != oldFlagsToFilterOut;

        if (wasSettingsUpdated) {
            localStorage.setItem("flag-set", flagSet);
            localStorage.setItem("mode", flagsToFilterOut);
        }

        dispatch("settingsClosed", wasSettingsUpdated);
    };
</script>

<section id="settings-section">
    <form>
        <p class="settings-category"><b>Flag set</b></p>
        <label for="all-flags">
            <input type="radio" id="all-flags" name="flag-set" value="All flags" bind:group={flagSet} />
            All flags (195)
        </label>
        <label for="nordic-cross-flags">
            <input
                type="radio"
                id="nordic-cross-flags"
                name="flag-set"
                value="Nordic cross flags"
                bind:group={flagSet}
            />
            Nordic cross flags (5)
        </label>
        <label for="three-stripe-flags">
            <input
                type="radio"
                id="three-stripe-flags"
                name="flag-set"
                value="Three stripe flags"
                bind:group={flagSet}
            />
            Three equal stripes flags (66)
        </label>
        <label for="hoist-triangle-flags">
            <input
                type="radio"
                id="hoist-triangle-flags"
                name="flag-set"
                value="Hoist triangle flags"
                bind:group={flagSet}
            />
            Triangle on hoist flags (18)
        </label>

        <p class="settings-category"><b>Filter out</b></p>
        <label for="show-all-mode">
            <input type="radio" id="show-all-mode" name="mode" value="Show all mode" bind:group={flagsToFilterOut} />
            Do not hide any flags
        </label>
        <label for="show-unseen-mode">
            <input
                type="radio"
                id="show-unseen-mode"
                name="mode"
                value="Show unseen mode"
                bind:group={flagsToFilterOut}
            />
            Hide flags I've already seen
        </label>
        <label for="show-unknown-mode">
            <input
                type="radio"
                id="show-unknown-mode"
                name="mode"
                value="Show unknown mode"
                bind:group={flagsToFilterOut}
            />
            Hide flags I've gotten right >60% of the time
        </label>

        <p class="settings-category"><b>Extra settings</b></p>
        <label for="reshow-unknown">
            <input
                type="checkbox"
                id="reshow-unknown"
                name="reshow-unknwon"
                value="Re-show unknown"
                bind:checked={reshowFlags}
            />
            Show flags I've gotten wrong more often
        </label>
        <button on:click|preventDefault={handleSaveSettings} id="exit">Exit</button>
    </form>
</section>

<style>
    #settings-section {
        background: var(--background);
        height: 100%;
        width: 100%;
        max-width: calc(500px - 1px);
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
    }
    input[type="radio"],
    input[type="checkbox"] {
        margin: 0 6px;
    }
    label {
        padding-bottom: 16px;
    }
    .settings-category {
        margin: 0 0 5px 5px;
    }
    form {
        padding: 12px;
    }
</style>
