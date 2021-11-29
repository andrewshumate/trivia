import { files, possibleGuessToOfficialGuess, convertKeyToOfficialGuess, officalGuessToKey } from "./carLogoData";
import type { QuestionSet } from "../generic/utils";
import { QuestionSetHandler } from "../generic/QuestionSetHandler";
import { areStringsSimilar, standardizeString } from "../generic/strings";

export const questionSetHandler = new (class extends QuestionSetHandler {
    questionType = "Car brand";
    allKeys = files;

    doesGuessExist = (guess: string): boolean => {
        return this.getOfficialGuess(guess) != undefined;
    };

    getKeysFromGuess = (guess: string): string[] => {
        const officializedGuess = this.getOfficialGuess(guess);
        if (officializedGuess) {
            return [officalGuessToKey.get(officializedGuess)!];
        } else {
            return [];
        }
    };

    isCorrectAnswer = (currentKey: string, userInput: string): boolean => {
        const correctAnswer = convertKeyToOfficialGuess(currentKey);
        return areStringsSimilar(correctAnswer, this.getOfficialGuess(userInput) ?? "");
    };

    getOfficialGuess = (guess: string): string | undefined => {
        return possibleGuessToOfficialGuess.get(standardizeString(guess));
    };

    getQuestionSets = (): QuestionSet[] => {
        return [
            {
                description: "All",
                questions: this.allKeys,
            },
        ];
    };
})();
