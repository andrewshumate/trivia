import { files } from "./carLogoData";
import type { QuestionSet } from "../generic/utils";
import { QuestionSetHandler } from "../generic/QuestionSetHandler";

export const questionSetHandler = new (class extends QuestionSetHandler {
    questionType = "Car brand";
    allKeys = files;

    doesGuessExist = (guess: string): boolean => {
        return this.getOfficialGuess(guess) != undefined;
    };

    getKeysFromGuess = (guess: string): string[] => {
        return ["penis lmao"];
    };

    isCorrectAnswer = (currentKey: string, userInput: string): boolean => {
        return true;
    };

    getOfficialGuess = (guess: string): string | undefined => {
        return "Ford";
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
