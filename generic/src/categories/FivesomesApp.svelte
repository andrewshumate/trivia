<script lang="ts">
    import GenericStringApp from "../generic/generichandlers/GenericStringApp.svelte";
    import { shuffle } from "../generic/utils";

    const questionType = "Famous fivesome";
    const answerType = "Name of group";
    const allData = new Map([
        ["Frank Sinatra, Dean Martin, Sammy Davis Jr, Peter Lawford, Joey Bishop", ["The Rat Pack"]],
        ["Dave Foley, Kevin McDonald, Bruce McCulloch, Mark McKinney, Scott Thompson", ["Kids in the Hall"]],
        [
            "Jason Lee Scott, Kimberly Hart, Zack Taylor, Trini Kwan, Billy Cranston",
            ["Original Mighty Morphin Power Rangers", "Mighty Morphin Power Rangers"],
        ],
        ["Iron Man, Hulk, Thor, Ant-Man, Wasp", ["Original Marvel Avengers", "Marvel Avengers", "Avengers"]],
        ["Jackie, Tito, Jermaine, Marlon, Michael", ["The Jackson Five", "Jackson Five", "Jackson 5"]],
        ["Sight, Smell, Touch, Taste, Hearing", ["The five senses", "Senses"]],
        ["Atlantic, Arctic, Indian, Pacific, Southern", ["Oceans"]],
        ["Genesis, Exodus, Leviticus, Numbers, Deuteronomy", ["Books of the Torah", "Torah"]],
        ["Red, Blue, Green, Yellow, Black", ["Colors of the Olympic Rings", "Olympic Ring colors"]],
        [
            "Scooby-Doo, Norville 'Shaggy' Rogers, Fred Jones, Daphne Blake, Velma Dinkley",
            ["Gang in the 'Mystery Machine'", "Mystery Machine gang", "Mystery Machine"],
        ],
        ["Denial, Anger, Bargaining, Depression, Acceptance", ["Stages of Grief"]],
        [
            "Victoria 'Posh' Beckham, Melanie 'Scary' Brown, Emma 'Baby' Bunton, Melanie 'Sporty' Chisholm, Geri 'Ginger' Halliwell",
            ["Spice Girls"],
        ],
        ["Donnie Wahlberg,Danny Wood,Joey McIntyre,Jordan Knight,Jonathan Knight", ["New Kids on the Block"]],
        ["Point Guard,Shooting Guard,Small Forward,Power Forward,Center", ["Basketball positions"]],
        ["Exosphere,Thermosphere,Mesosphere,Stratosphere,Troposphere", ["Layers of the atmosphere"]],
        ["Huron,Ontario,Michigan,Erie,Superior", ["Great Lakes"]],
        [
            "Main Street USA,Adventureland,Frontierland,Fantasyland,Tomorrowland",
            ["Original Lands of Disneyland", "Lands of Disneyland", "Disneyland lands"],
        ],
        [
            "Stadion (Foot Race),Wrestling,Long Jump,Javelin Throw,Discus Throw",
            [
                "Original Olympic Pentathlon Events",
                "Olympic Pentathlon Events",
                "Pentathlon Events",
                "Olympic Pentathlon",
            ],
        ],
        ["Steven Tyler, Tom Hamilton, Joey Kramer, Joe Perry, Brad Whitford", ["Aerosmith"]],
        ["Sheldon, Leonard, Penny, Howard, Raj", ["Big Bang Theory"]],
        [
            "The Radio, Lampy, Blanky, Kirby, Toaster",
            ["The appliances from The Brave Little Toaster", "The Brave Little Toaster"],
        ],
        [
            "Matt, Mary, Lucy, Simon, Ruthie",
            ["The Camden kids from 7th Heaven", "7th Heaven", "Seventh Heaven", "The Camden kids"],
        ],
        ["Roseanne, Dan, Becky, Darlene, DJ", ["The Conners"]],
        [
            "Sonny, Fredo, Michael, Connie, Tom",
            ["The Corleone kids from The Godfather", "The Corleone kids", "The Corleones"],
        ],
        ["Muno, Foofa, Brobee, Toodee, Plex", ["The Yo Gabba Gabba! gang", "Yo Gabba Gabba"]],
        [
            "Dorothy, The Scarecrow, The Tin Man, The Cowardly Lion, Toto",
            ["The Wizard of Oz travelers", "Wizard of Oz"],
        ],
        [
            "Francis, Reese, Malcolm, Dewey, Jamie",
            ["The Wilkerson boys from Malcolm in the Middle", "Wilkerson boys", "Malcolm in the Middle"],
        ],
        ["Todd Hockney, Michael McManus, Fred Fenster, Dean Keaton, Roger 'Verbal' Kint", ["The Unusual Suspects"]],
        ["Homer, Marge, Bart, Lisa, Maggie", ["The Simpsons"]],
        ["Bailey, Charlie, Julia, Claudia, Owen", ["The Salingers from 'Party of Five'", "Party of Five"]],
        ["Mick Jagger, Keith Richards, Charlie Watts, Bill Wyman, Brian Jones", ["The Rolling Stones"]],
        [
            "Father, Mother, Fritz, Ernest, Francis",
            ["The Swiss Robinson Family", "Swiss Family Robinson", "Swiss Robinsons"],
        ],
        ["John, Maureen, Judy, Penny, Will", ["The Robinsons from 'Lost in Space'"]],
        ["Alan, Merrill, Wayne, Jay, Donny", ["The Osmonds"]],
        ["Jane, Lisbon, Cho, Rigsby, Van Pelt", ["The original Mentalist team", "Mentalist"]],
        ["Chico, Harpo, Groucho, Zeppo, Gummo", ["The Marx Brothers"]],
        ["Sondra, Denise, Theo, Vanessa, Rudy", ["The Huxtable kids from 'The Cosby Show'", "Huxtables"]],
        ["Frankie, Mike, Axl, Sue, Brick", ["The Hecks from 'The Middle'", "Hecks"]],
        ["Ty, Claire, Haley, Alex, Luke", ["The Dunphys from 'Modern Family'", "Dunphys", "Dunphies"]],
        ["Howard, Marion, Richie, Joanie, The Fonz", ["The Cunninghams from 'Happy Days'", "Cunninghams"]],
    ]);

    const listifyString = (key: string): string[] => {
        const list = key.split(",");
        return shuffle(list);
    };

    const getFirstKey = (keys: string[]): string => {
        return keys[0];
    };

    const getAnswer = (keys: string[]): string => {
        return allData.get(keys[0])![0];
    };
</script>

<GenericStringApp {questionType} {answerType} {allData} let:currentKey>
    <span slot="question">
        <ul>
            {#each listifyString(currentKey) as thing}
                <li>{thing}</li>
            {/each}
        </ul>
    </span>
    <span slot="previous-answer">
        {getAnswer(currentKey)}:
        <ul>
            {#each listifyString(getFirstKey(currentKey)) as thing}
                <li>{thing}</li>
            {/each}
        </ul>
    </span>
</GenericStringApp>

<style>
    ul {
        margin: 0;
    }
</style>
