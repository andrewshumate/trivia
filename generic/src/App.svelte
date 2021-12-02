<script lang="ts">
    import StadiumsApp from "./stadiums/StadiumsApp.svelte";
    import CarLogosApp from "./carlogos/CarLogos.svelte";
    import PlaneMoviesApp from "./planemovies/PlaneMoviesApp.svelte";

    const nflStadiums = "Stadiums";
    const carLogos = "Car logos";
    const planeMovies = "Movies";

    let currentTab = localStorage.getItem("trivia-category") ?? nflStadiums;
    const tabs = [nflStadiums, carLogos, planeMovies];
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
    {#if currentTab == carLogos}
        <CarLogosApp />
    {:else if currentTab == planeMovies}
        <PlaneMoviesApp />
    {:else}
        <StadiumsApp />
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
        white-space: nowrap;
    }
    li {
        list-style: none;
        display: inline;
        margin: 0 0.5em;
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
