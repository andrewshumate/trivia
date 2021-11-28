<script lang="ts">
    import { getTeamInfo, NflTeam } from "./data";
    import { questionSetHandler as x } from "./StadiumQuestionSetHandler";
    import Content from "../generic/Content.svelte";

    const questionSetHandler = x;

    const getShortTeamNameFromKey = (key: string): string => {
        const team = NflTeam[key as keyof typeof NflTeam];
        return getTeamInfo(team).teamNames[1];
    };

    const getLongTeamNameFromKey = (key: string): string => {
        const team = NflTeam[key as keyof typeof NflTeam];
        return getTeamInfo(team).teamNames[0];
    };

    const getStadiumNameFromKey = (key: string): string => {
        const team = NflTeam[key as keyof typeof NflTeam];
        return getTeamInfo(team).stadiumNames[0];
    };

    const getStadiumLocationFromKey = (key: string): string => {
        const team = NflTeam[key as keyof typeof NflTeam];
        return getTeamInfo(team).cityNames[0];
    };
</script>

<Content {questionSetHandler} let:currentKey let:isResult>
    <span slot="question">
        {#if isResult}
            A: {currentKey}
        {:else}
            What is the stadium name for
            <span class="team-name">the {getShortTeamNameFromKey(currentKey)}</span>?
        {/if}
    </span>
    <span slot="answer">
        <span class="team-name">The {getLongTeamNameFromKey(currentKey)}</span>
        play at <span class="stadium-name">{getStadiumNameFromKey(currentKey)}</span>
        in <span class="city-name">{getStadiumLocationFromKey(currentKey)}</span>.
    </span>
</Content>

<style>
    .team-name {
        font-weight: bold;
        color: red;
    }
    .stadium-name {
        font-weight: bold;
        color: blue;
    }
    .city-name {
        font-weight: bold;
        color: green;
    }
</style>
