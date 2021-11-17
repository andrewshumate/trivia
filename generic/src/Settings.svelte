<script lang="ts">
    export let showSettings = false;
</script>

{#if showSettings}
    <section id="settings-section">
        <form id="mode-selector">
            <p class="settings-category"><b>Flag set</b></p>
            <div class="individual-setting">
                <input type="radio" id="all-flags" name="flag-set" value="All flags" />
                <label for="all-flags">All flags (195)</label>
            </div>
            <div class="individual-setting">
                <input type="radio" id="nordic-cross-flags" name="flag-set" value="Nordic cross flags" />
                <label for="nordic-cross-flags">Nordic cross flags (5)</label>
            </div>
            <div class="individual-setting">
                <input type="radio" id="three-stripe-flags" name="flag-set" value="Three stripe flags" />
                <label for="three-stripe-flags">Three equal stripes flags (66)</label>
            </div>
            <div class="individual-setting">
                <input type="radio" id="hoist-triangle-flags" name="flag-set" value="Hoist triangle flags" />
                <label for="hoist-triangle-flags">Triangle on hoist flags (18)</label>
            </div>

            <p class="settings-category"><b>Filter out</b></p>
            <div class="individual-setting">
                <input type="radio" id="show-all-mode" name="mode" value="Show all mode" />
                <label for="show-all-mode">Do not hide any flags</label>
            </div>
            <div class="individual-setting">
                <input type="radio" id="show-unseen-mode" name="mode" value="Show unseen mode" />
                <label for="show-unseen-mode">Hide flags I've already seen</label>
            </div>
            <div class="individual-setting">
                <input type="radio" id="show-unknown-mode" name="mode" value="Show unknown mode" />
                <label for="show-unknown-mode">Hide flags I've gotten right >60% of the time</label>
            </div>

            <p class="settings-category"><b>Extra settings</b></p>
            <div>
                <input type="checkbox" id="reshow-unknown" name="reshow-unknwon" value="Re-show unknown" />
                <label for="reshow-unknown">Show flags I've gotten wrong more often</label>
            </div>
        </form>
        <button on:click id="exit">Exit</button>
    </section>
{/if}

<style>
    #settings-section {
        background: var(--background);
        padding: 12px;
        height: calc(100% - 24px);
        width: calc(100% - 24px);
        max-width: 500px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 999;
    }
    #settings-section form {
        margin-bottom: 12px;
    }
    input[type="radio"],
    input[type="checkbox"] {
        margin: 0 6px;
    }
    label {
        display: revert;
    }
    .individual-setting {
        height: 35px;
    }
    .settings-category {
        margin: 0 0 5px 5px;
    }
    button {
        height: 35px;
        border-radius: 7px;
        width: 100%;
    }
</style>
