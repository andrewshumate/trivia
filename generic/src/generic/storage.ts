import * as data from "../data";
import { standardizeString } from "./strings";

export interface Stats {
    numCorrectGuesses: number;
    numIncorrectGuesses: number;
    numTotalGuesses: number;
    percentCorrect: number;
    incorrectGuesses: string[];
}

export const setStats = (key: string, wasGuessCorrect: boolean, guess: string): void => {
    const statsString = localStorage.getItem(key);

    const stats = statsString
        ? (JSON.parse(statsString) as Stats)
        : {
              numCorrectGuesses: 0,
              numIncorrectGuesses: 0,
              numTotalGuesses: 0,
              percentCorrect: 0.0,
              incorrectGuesses: [],
          };

    stats.numTotalGuesses += 1;
    if (wasGuessCorrect) {
        stats.numCorrectGuesses += 1;
    } else {
        stats.numIncorrectGuesses += 1;

        let standardizedGuess = data.possibleNameToOfficalName.get(standardizeString(guess));
        if (standardizedGuess == null) standardizedGuess = guess.trim();
        if (standardizedGuess && !stats.incorrectGuesses.includes(standardizedGuess)) {
            stats.incorrectGuesses.push(standardizedGuess);
        }
    }
    stats.percentCorrect = stats.numCorrectGuesses / stats.numTotalGuesses;

    localStorage.setItem(key, JSON.stringify(stats));
};

export const getStats = (key: string): Stats | null => {
    const statsString = localStorage.getItem(key);
    if (statsString) {
        return JSON.parse(statsString) as Stats;
    } else {
        return null;
    }
};

export const getQuestionSetString = (): string => {
    return localStorage.getItem("question-set") || "All flags";
};

export const getMode = (): string => {
    return localStorage.getItem("mode") || "Show unseen mode";
};

export const getShouldReshowUnknown = (): boolean => {
    return localStorage.getItem("shouldReshowUnknown") !== "false";
};
