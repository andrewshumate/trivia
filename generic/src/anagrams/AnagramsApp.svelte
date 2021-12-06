<script lang="ts">
    import GenericStringApp from "../generic/generichandlers/GenericStringApp.svelte";

    const questionType = "Anagram";
    const answerType = "(Un)shuffled anagram";

    // https://1029now.iheart.com/content/2018-03-23-25-amusing-celebrity-name-anagrams/
    // https://www.iluenglish.com/anagrams-of-famous-names/
    // http://www.pilelineonline.com/anagram.htm
    const allData = new Map([
        ["A mean description of her would be: 'Unclean rot'", ["Ann Coulter"]],
        ["They'd very sad if there were 'no more stars'", ["Astronomer"]],
        ["You might call them 'moon starers'", ["Astronomer"]],
        ["Singer: 'Presbyterians'", ["Britney Spears"]],
        ["This actors stored in many a 'Old West Action'", ["Clint Eastwood"]],
        ["They might not be that upset about a 'Teacher in vast poverty'", ["The Conservative Party"]],
        ["There's definitely 'No City Dust Here ", ["The Country Side"]],
        ["Some college kid's 'dirty room'", ["Dormitory"]],
        ["If you have 'bad credit', you might have to use THIS", ["Debit card"]],
        ["Someone in a lot of THIS might say 'A Rope Ends It'", ["Desperation"]],
        ["It is 'Docile, as a Man Tamed it'", ["A Domesticated Animal"]],
        ["It's equal to 'Twelve plus one'", ["Eleven plus two"]],
        ["This celebrity looks 'Fine in Torn Jeans'", ["Jennifer Aniston"]],
        ["He hasn't made a song called 'I am a jerk, but listen.' yet", ["Justin Timberlake"]],
        ["You probably wouldn't describe her as a 'Gay kinky Hitler'", ["Keira Knightley"]],
        ["The singer could be called 'One Cool Dance Musician'", ["Madonna Louise Ciccone"]],
        ["Politican: 'That great charmer'", ["Margaret Thatcher"]],
        ["Manly Man? No Sir", ["Marilyn Manson"]],
        ["Mom rails nanny", ["Marilyn Manson"]],
        ["You probably wouldn't tell her 'Try Eel Sperm'", ["Meryl Streep"]],
        ["A former politican might have called her a 'Nice silky woman'", ["Monica Lewinsky"]],
        ["It could be described as 'Here Come Dots'", ["The Morse Code"]],
        ["You might describe a bad one of THESE as a 'Woman Hitler'", ["Mother-in-law"]],
        ["A bad man (no lies)", ["Osama Bin Laden"]],
        ["Ford, the Real Star, is OK", ["Raiders of the Lost Ark"]],
        ["I, an artist, so known as bean", ["Rowan Sebastian Atkinson"]],
        ["There's probably 'Cash Lost in 'em'", ["Slot machines"]],
        ["I Am Lord Voldemort", ["Tom Marvolo Riddle"]],
        [
            "A thin man ran; makes a large stride; left planet, pins flag on moon! On to Mars!",
            ["That's one small step for a man, one giant leap for mankind"],
        ],
        ["This Olympian hired someone to 'Do an angry hit'", ["Tonya Harding"]],
        ["Book: 'Huge water tale stuns. End had you tense'", ["Twenty Thousand Leagues Under the Sea"]],
        ["This bank leaves 'No Wire Unsent'", ["Western Union"]],
    ]);
</script>

<GenericStringApp {questionType} {answerType} {allData} />
