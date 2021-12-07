<script lang="ts">
    import StadiumsApp from "./stadiums/StadiumsApp.svelte";
    import CarLogosApp from "./carlogos/CarLogos.svelte";
    import PlaneMoviesApp from "./planemovies/PlaneMoviesApp.svelte";
    import FivesomesApp from "./fivesomes/FivesomesApp.svelte";
    import AnagramsApp from "./anagrams/AnagramsApp.svelte";

    const nflStadiums = "Stadiums";
    const carLogos = "Car logos";
    const planeMovies = "Movies";
    const fivesomes = "Fivesomes";
    const anagrams = "Anagrams";

    let currentTab = localStorage.getItem("trivia-category") ?? nflStadiums;
    const tabs = [anagrams, planeMovies, fivesomes, nflStadiums, carLogos];

    const handleTabClick = (event: Event): void => {
        const li = event.target as HTMLLIElement;
        currentTab = li.innerText.trim();
        localStorage.setItem("trivia-category", currentTab);
    };
</script>

<main>
    <nav>
        <ul>
            {#each tabs as tab}
                <li class:active-tab={tab === currentTab} on:click={handleTabClick}>
                    {tab}
                </li>
            {/each}
        </ul>
    </nav>

    {#if currentTab == carLogos}
        <CarLogosApp />
    {:else if currentTab == planeMovies}
        <PlaneMoviesApp />
    {:else if currentTab == nflStadiums}
        <StadiumsApp />
    {:else if currentTab == anagrams}
        <AnagramsApp />
    {:else}
        <FivesomesApp />
    {/if}
</main>

<style>
    :global(body) {
        background: var(--background-background);
        color: var(--foreground);
        font-family: sans-serif;
    }
    main {
        background: var(--background);
        padding: 0;
        height: 100%;
        max-width: 500px;
        margin: auto;
    }
    nav {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 500px;
        position: absolute;
    }
    ul {
        margin: 8px 34px 0px 44px;
        padding: 0;
        list-style-type: none;
        white-space: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
        scrollbar-width: none;
    }
    ul::-webkit-scrollbar {
        background: transparent;
        width: 0px;
    }
    li {
        list-style: none;
        display: inline;
        margin: 0 3px;
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
