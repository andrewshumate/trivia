import { NflTeam, getTeamInfo, allKeys, possibleGuessToOfficialGuess, guessToKeys } from "./data";
import type { QuestionSet } from "../generic/utils";
import { QuestionSetHandler } from "../generic/QuestionSetHandler";
import { areStringsSimilar, standardizeString } from "../generic/strings";

export const questionSetHandler = new (class extends QuestionSetHandler {
    questionType = "Stadium";
    allKeys = allKeys;

    doesGuessExist = (guess: string): boolean => {
        return this.getOfficialGuess(guess) != undefined;
    };

    getKeysFromGuess = (guess: string): string[] => {
        const officializedGuess = this.getOfficialGuess(guess);
        if (officializedGuess) {
            return guessToKeys(officializedGuess);
        } else {
            return [];
        }
    };

    isCorrectAnswer = (currentKey: string, userInput: string): boolean => {
        const team = NflTeam[currentKey as keyof typeof NflTeam];
        const stadiumNames = getTeamInfo(team).stadiumNames;

        for (let i = 0; i < stadiumNames.length; i++) {
            if (areStringsSimilar(stadiumNames[i], userInput)) return true;
        }

        return false;
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
