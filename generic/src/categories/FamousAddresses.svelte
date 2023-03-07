<script lang="ts">
    import GenericStringApp from "../generic/generichandlers/GenericStringApp.svelte";

    const questionType = "Address/location";
    const answerType = "Address/location";

    const allData = new Map([
        ["1600 Pennsylvania Avenue", ["White House"]],
        ["10 Downing Street", ["UK Prime Minister's Office"]],
        ["221B Baker Street", ["Sherlock Holmes"]],
        ["1313 Mockingbird Lane", ["The Munsters"]],
        ["0001 Cemetery Lane", ["The Addams Family"]],
        ["4222 Clinton Way", ["The Brady Bunch"]],
        ["12 Grimmauld Place", ["Sirius Black"]],
        ["112 1/2 Beacon Street", ["Cheers"]],
        ["742 Evergreen Terrace", ["The Simpsons"]],
        ["263 Prinsengracht", ["Anne Frank"]],
        ["1060 West Addison Street", ["Wrigley Field"]],
        ["350 Fifth Avenue", ["The Empire State Building"]],
        ["62 West Wallaby Street", ["Wallace and Gromit"]],
        ["31 Spooner Street", ["Griffin family from Family Guy"]],
        ["4 Privet Drive", ["The Dursley family from Harry Potter"]],
        ["11 Wall Street", ["New York stock exchange"]],
        ["4059 Mount Lee Drive", ["The Hollywood sign"]],
        ["2 Macquarie Street", ["Sydney Opera House"]],
        ["Champ de Mars, 5 Avenue Anatole", ["The Eiffel Tower"]],
        ["1007 Mountain Drive", ["Batman's Cave"]],
        ["90 Bedford Street", ["Friend's apartment"]],
    ]);

    // Append the reverse of allData
    for (const [key, values] of allData.entries()) {
        for (const value of values) {
            if (!allData.has(value)) {
                allData.set(value, [key]);
            } else {
                const keys = allData.get(value);
                if (!keys.includes(key)) {
                    keys.push(key);
                    allData.set(value, keys);
                }
            }
        }
    }
</script>

<GenericStringApp {questionType} {answerType} {allData} />
