import type { QuestionSet } from "../utils";
import { QuestionSetHandler } from "../QuestionSetHandler";
import { areStringsSimilar, standardizeString } from "../strings";

export class GenericQuestionSetHandler extends QuestionSetHandler {
    constructor(
        public questionType: string,
        public answerType: string,

        /**
         * key = A key representing the question shown to the user
         *
         * value = A list of possible answers. NOTE: The first string in this list
         *         will be used to display the answer to the user in the results page.
         *
         * e.g.
         *      key = URL of image of flag of the United States
         *
         *      value = ["United States of America", "United States", "USA", "US"]
         */
        public allData: Map<string, string[]>
    ) {
        super();
    }

    doesGuessExist = (guess: string): boolean => {
        return this.getOfficialGuess(guess) != undefined;
    };

    isCorrectAnswer = (currentKey: string, userInput: string): boolean => {
        const possibleAnswers = this.allData.get(currentKey)!;

        for (let i = 0; i < possibleAnswers.length; i++) {
            if (areStringsSimilar(possibleAnswers[i], userInput)) {
                return true;
            }
        }
        return false;
    };

    getQuestionSets = (): QuestionSet[] => {
        return [
            {
                description: "All",
                questions: [...this.allData.keys()],
            },
        ];
    };

    /* ##################################
     * CONVERTERS
     * TODO make this nicer later
     * ##################################
     */
    /** Used to convert a key (question) into an answer shown in the results screen */
    convertKeyToOfficialGuess = (key: string): string => {
        return this.allData.get(key)![0];
    };

    /** Used to determine if a guess exists, and also used to standardize a guess when
     * storing incorrect guesses in local storage
     */
    getOfficialGuess = (guess: string): string | undefined => {
        return this.possibleGuessToOfficialGuess.get(standardizeString(guess));
    };
    private possibleGuessToOfficialGuess = ((): Map<string, string> => {
        const result: Map<string, string> = new Map();
        const allKeys = [...this.allData.keys()];

        for (let i = 0; i < allKeys.length; i++) {
            const questionKey = allKeys[i];
            const possibleAnswers = this.allData.get(questionKey)!;
            possibleAnswers.forEach((answer) => result.set(standardizeString(answer), possibleAnswers[0]));
        }

        return result;
    })();

    /** Used to show the actual question for whatever the user guessed */
    getKeysFromGuess = (guess: string): string[] => {
        const officializedGuess = this.getOfficialGuess(guess);
        if (officializedGuess) {
            return this.getAllAssociatedKeys(this.officalGuessToKey.get(officializedGuess)!);
        } else {
            return [];
        }
    };
    private officalGuessToKey = ((): Map<string, string> => {
        const result: Map<string, string> = new Map();
        const allKeys = [...this.allData.keys()];

        for (let i = 0; i < allKeys.length; i++) {
            const questionKey = allKeys[i];
            const possibleAnswers = this.allData.get(questionKey)!;
            result.set(possibleAnswers[0], questionKey);
        }

        return result;
    })();
}
