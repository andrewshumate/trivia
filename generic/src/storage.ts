    import * as data from "./data";
    import {standardizeString} from "./strings";
    import { shuffle } from "./utils";

    export interface Stats {
        numCorrectGuesses: number;
        numIncorrectGuesses: number;
        numTotalGuesses: number;
        percentCorrect: number;
        incorrectGuesses: string[];
    }

    export function setStats(country: string, wasGuessCorrect: boolean, guess: string): void {
        const statsString = localStorage.getItem(country);

        let stats = statsString
            ? JSON.parse(statsString)
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

        localStorage.setItem(country, JSON.stringify(stats));
    }

    export function getStats(country: string): Stats | null {
        const statsString = localStorage.getItem(country);
        if (statsString) {
            return JSON.parse(statsString);
        } else {
            return null;
        }
    }

    export function getFlagSetString(): string {
        return localStorage.getItem("flag-set") || "All flags";
    }

    export function getFlagSet(): string[] {
        const flagSetString = getFlagSetString();

        if (flagSetString == "All flags") {
            return shuffle(Array.from(data.flags.keys()));
        } else if (flagSetString == "Nordic cross flags") {
            return shuffle([...data.nordicCrossFlags]);
        } else if (flagSetString == "Three stripe flags") {
            return shuffle([...data.threeStripeFlags]);
        } else if (flagSetString == "Hoist triangle flags") {
            return shuffle([...data.triangleOnHoistFlags]);
        } else {
            return [];
        }
    }

    export function getMode(): string {
        return localStorage.getItem("mode") || "Show unseen mode";
    }

    export function getShouldReshowUnknown(): boolean {
        return localStorage.getItem("shouldReshowUnknown") !== "false";
    }
