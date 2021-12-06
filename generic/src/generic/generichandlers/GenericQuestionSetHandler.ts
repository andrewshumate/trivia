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

    getKeysFromGuess = (guess: string): string[] => {
        const officializedGuess = this.getOfficialGuess(guess);
        if (officializedGuess) {
            return [this.officalGuessToKey.get(officializedGuess)!];
        } else {
            return [];
        }
    };

    isCorrectAnswer = (currentKey: string, userInput: string): boolean => {
        const correctAnswer = this.convertKeyToOfficialGuess(currentKey);
        return areStringsSimilar(correctAnswer, this.getOfficialGuess(userInput) ?? "");
    };

    getOfficialGuess = (guess: string): string | undefined => {
        return this.possibleGuessToOfficialGuess.get(standardizeString(guess));
    };

    getQuestionSets = (): QuestionSet[] => {
        return [
            {
                description: "All",
                questions: [...this.allData.keys()],
            },
        ];
    };

    convertKeyToOfficialGuess = (key: string): string => {
        return this.allData.get(key)![0];
    };

    possibleGuessToOfficialGuess = ((): Map<string, string> => {
        const result: Map<string, string> = new Map();
        const allKeys = [...this.allData.keys()];

        for (let i = 0; i < allKeys.length; i++) {
            const questionKey = allKeys[i];
            const possibleAnswers = this.allData.get(questionKey)!;
            possibleAnswers.forEach((answer) => result.set(standardizeString(answer), possibleAnswers[0]));
        }

        return result;
    })();

    officalGuessToKey = ((): Map<string, string> => {
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
