<script lang="ts">
    import Content from "./generic/Content.svelte";
    import { areStringsSimilar } from "./generic/strings";
    import { flags, nordicCrossFlags, threeStripeFlags, triangleOnHoistFlags } from "./data";

    const questionType = "Country";

    const isCorrectAnswer = (currentQuestion: string, guess: string): boolean => {
        if (areStringsSimilar(currentQuestion, guess)) return true;

        const alternateNames = flags.get(currentQuestion)!.alternateNames;
        for (let i = 0; i < alternateNames.length; i++) {
            if (areStringsSimilar(alternateNames[i], guess)) return true;
        }

        return false;
    };

    const doesGuessExist = (guess: string): boolean => {
        return flags.get(guess) != undefined;
    };

    interface QuestionSet {
        description: string;
        questions: string[];
    }

    const getQuestionSets = (): QuestionSet[] => {
        return [
            {
                description: "All",
                questions: Array.from(flags.keys()),
            },
            {
                description: "Nordic cross flags",
                questions: nordicCrossFlags,
            },
            {
                description: "Three stripes flags",
                questions: threeStripeFlags,
            },
            {
                description: "Hoist triangle flags",
                questions: triangleOnHoistFlags,
            },
        ];
    };
</script>

<!-- Ignore this error: https://stackoverflow.com/questions/65906478/ -->
<Content {isCorrectAnswer} {doesGuessExist} {questionType} {getQuestionSets} let:currentQuestion let:isResult>
    <span slot="question">
        <img
            class:flag={!isResult}
            class:mini-flags={isResult}
            alt="{questionType} flag"
            src={flags.get(currentQuestion)?.imageUrl}
        />
    </span>
</Content>

<style>
    .flag {
        max-height: calc(100% - 114px);
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    .mini-flags {
        max-height: 50px;
        display: block;
    }
</style>
