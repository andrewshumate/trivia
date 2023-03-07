<script lang="ts">
    import GenericStringApp from "../generic/generichandlers/GenericStringApp.svelte";

    const questionType = "State slogan/name";
    const answerType = "State slogan/name";

    const allData = new Map([
        ["Alabama", ["Yellowhammer State", "The Heart of Dixie", "We dare defend our rights", "Cotton state"]],
        ["Alaska", ["The Last Frontier", "North to the Future"]],
        ["Arizona", ["The Grand Canyon State", "God enriches"]],
        ["Arkansas", ["The Natural State", "The people rule"]],
        ["California", ["The Golden State", "Eureka!", "I have found it"]],
        ["Colorado", ["The Centennial State", "Nothing without providence"]],
        ["Connecticut", ["The Constitution State", "He who transplanted still sustains", "Nutmeg State"]],
        ["Delaware", ["The First State", "Diamond State"]],
        ["Florida", ["The Sunshine State", "In God We Trust"]],
        ["Georgia", ["The Peach State", "Wisdom, Justice, Moderation", "Empire State of the South"]],
        ["Hawaii", ["The Aloha State", "The life of the land is perpetuated in righteousness"]],
        ["Idaho", ["The Gem State", "Let it be perpetual", "Land of Lincoln"]],
        ["Illinois", ["The Prairie State", "State sovereignty, national union"]],
        ["Indiana", ["The Hoosier State", "The Crossroads of America"]],
        ["Iowa", ["The Hawkeye State", "Our liberties we prize and our rights we will maintain", "Corn State"]],
        ["Kansas", ["The Sunflower State", "To the stars through difficulties", "Jayhawker State"]],
        ["Kentucky", ["The Bluegrass State", "United we stand, divided we fall", "Let us be grateful to God"]],
        ["Louisiana", ["The Pelican State", "Union, justice, confidence", "Creole State", "Sugar State"]],
        ["Maine", ["The Pine Tree State", "I lead"]],
        ["Maryland", ["The Old Line State", "Strong deeds, gentle words", "Free state"]],
        [
            "Massachusetts",
            ["The Bay State", "By the sword we seek peace, but peace only under liberty", "Old Colony State"],
        ],
        ["Michigan", ["The Great Lakes State", "If you seek a pleasant peninsula, look about you"]],
        [
            "Minnesota",
            [
                "The North Star State",
                "The Land of 10,000 Lakes",
                "The star of the North",
                "Gopher State",
                "Land of Sky-Blue Waters",
            ],
        ],
        ["Mississippi", ["The Magnolia State", "By valor and arms"]],
        ["Missouri", ["The Show Me State", "Let the welfare of the people be the supreme law"]],
        ["Montana", ["The Treasure State", "Gold and silver", "Big Sky Country"]],
        ["Nebraska", ["The Cornhusker State", "Equality before the law", "Beef State"]],
        ["Nevada", ["The Silver State", "All For Our Country", "Sagebrush State", "Battle Born State"]],
        ["New Hampshire", ["The Granite State", "Live Free or Die"]],
        ["New Jersey", ["The Garden State", "Liberty and prosperity"]],
        ["New Mexico", ["The Land of Enchantment", "It grows as it goes"]],
        ["New York", ["The Empire State", "Excelsior", "Ever upward"]],
        ["North Carolina", ["The Tar Heel State", "To be, rather than to seem", "Old North State"]],
        [
            "North Dakota",
            [
                "The Peace Garden State",
                "Liberty and union, now and forever, one and inseparable",
                "One sows for the benefit of another age",
                "Flickertail State",
                "Sioux State",
            ],
        ],
        ["Ohio", ["The Buckeye State", "With God, all things are possible"]],
        ["Oklahoma", ["The Sooner State", "Labor conquers all things"]],
        ["Oregon", ["The Beaver State", "She flies with her own wings"]],
        ["Pennsylvania", ["The Keystone State", "Virtue, liberty, and independence"]],
        ["Rhode Island", ["The Ocean State", "Hope"]],
        ["South Carolina", ["The Palmetto State", "While I breathe, I hope", "Ready in soul and resource"]],
        ["South Dakota", [" Mount Rushmore State", "Under God the people rule"]],
        ["Tennessee", ["The Volunteer State", "Agriculture and Commerce"]],
        ["Texas", ["The Lone Star State", "Friendship"]],
        ["Utah", ["The Beehive State", "Industry"]],
        ["Vermont", ["The Green Mountain State", "Freedom and Unity", "May the fourteenth star shine bright"]],
        ["Virginia", ["The Old Dominion State", "Thus always to tyrants", "Mother of Presidents"]],
        ["Washington", ["The Evergreen State", "Alki", "By and by"]],
        ["West Virginia", ["The Mountain State", "Mountaineers are always free"]],
        ["Wisconsin", ["The Badger State", "Forward", "America’s Dairyland"]],
        ["Wyoming", ["The Equality State", "The Cowboy State", "Equal Rights"]],
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

    console.log(allData);
</script>

<GenericStringApp {questionType} {answerType} {allData} />
