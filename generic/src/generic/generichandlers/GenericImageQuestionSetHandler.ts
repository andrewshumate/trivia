import type { QuestionSet } from "../utils";
import { QuestionSetHandler } from "../QuestionSetHandler";
import { areStringsSimilar, standardizeString } from "../strings";

export class GenericImageQuestionSetHandler extends QuestionSetHandler {
    constructor(public triviaCategory: string, public questionType: string, public allKeys: string[]) {
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
                questions: this.allKeys,
            },
        ];
    };

    possibleGuessToOfficialGuess = ((): Map<string, string> => {
        const result: Map<string, string> = new Map();

        for (let i = 0; i < this.allKeys.length; i++) {
            const fileName = this.allKeys[i];
            const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
            possibleNames.forEach((name) => result.set(standardizeString(name), possibleNames[0]));
        }

        return result;
    })();

    convertKeyToOfficialGuess = (key: string): string => {
        return key.split("/")[2].split(".")[0].split(",")[0];
    };

    officalGuessToKey = ((): Map<string, string> => {
        const result: Map<string, string> = new Map();

        for (let i = 0; i < this.allKeys.length; i++) {
            const fileName = this.allKeys[i];
            const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
            result.set(possibleNames[0], fileName);
        }

        return result;
    })();

    preload = (imageArray: string[], index: number): void => {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            const img = new Image();
            img.onload = (): void => {
                this.preload(imageArray, index + 1);
            };

            img.src = imageArray[index];
        }
    };
}
