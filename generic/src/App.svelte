<script lang="ts">
    import StadiumsApp from "./stadiums/StadiumsApp.svelte";
    import CarLogosApp from "./carlogos/CarLogos.svelte";

    const nflStadiums = "NFL stadiums";
    const carLogos = "Car logos";

    let currentTab = localStorage.getItem("trivia-category") ?? nflStadiums;
    const tabs = [nflStadiums, carLogos];
</script>

<main>
    <ul>
        {#each tabs as tab}
            <li
                class:active-tab={tab === currentTab}
                on:click={() => {
                    currentTab = tab;
                    localStorage.setItem("trivia-category", currentTab);
                }}
            >
                {tab}
            </li>
        {/each}
    </ul>
    {#if currentTab == nflStadiums}
        <StadiumsApp />
    {:else if currentTab == carLogos}
        <span>
            <CarLogosApp />
        </span>
    {/if}
</main>

<style>
    :global(body) {
        background: var(--background-background);
        color: var(--foreground);
        font-family: sans-serif;
    }
    main {
        padding: 0;
        height: 100%;
        max-width: 500px;
        margin: auto;
    }
    ul {
        position: fixed;
        margin-top: 8px;
        left: 50%;
        transform: translate(-50%, 0);
        padding-left: 0px;
    }
    li {
        list-style: none;
        display: inline;
        margin-right: 1em;
        font-size: 12px;
        opacity: 50%;
        cursor: pointer;
    }
    .active-tab {
        color: #d91b42;
        border-bottom: 2px solid #d91b42;
        opacity: 100%;
    }
</style>
