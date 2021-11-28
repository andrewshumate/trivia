import { flags, nordicCrossFlags, threeStripeFlags, triangleOnHoistFlags, possibleNameToOfficalName } from "./data";
import type { QuestionSet } from "../generic/utils";
import { QuestionSetHandler } from "../generic/QuestionSetHandler";
import { areStringsSimilar } from "../generic/strings";

/**
 * Key = Official team name
 * Question = "What stadium does `short team name` play at?"
 * Answer/guess = Stadium name
 */
export const questionSetHandler = new (class extends QuestionSetHandler {
    questionType = "Country";
    allKeys = Array.from(flags.keys());

    isCorrectAnswer = (expected: string, actual: string): boolean => {
        if (areStringsSimilar(expected, actual)) return true;

        const alternateNames = flags.get(expected)!.alternateNames;
        for (let i = 0; i < alternateNames.length; i++) {
            if (areStringsSimilar(alternateNames[i], actual)) return true;
        }

        return false;
    };

    getOfficialGuess = (guess: string): string | undefined => {
        return possibleNameToOfficalName.get(guess);
    };

    getQuestionSets = (): QuestionSet[] => {
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
})();
