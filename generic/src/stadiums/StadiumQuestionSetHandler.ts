import { NflTeam, getTeamInfo, allKeys, possibleGuessToOfficialGuess, guessToKeys } from "./data";
import type { QuestionSet } from "../generic/utils";
import { QuestionSetHandler } from "../generic/QuestionSetHandler";
import { areStringsSimilar, standardizeString } from "../generic/strings";

export const questionSetHandler = new (class extends QuestionSetHandler {
    questionType = "NFL stadiums";
    answerType = "Stadium";
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

    getAllAssociatedKeys = (key: string): string[] => {
        if (key === "New York Jets" || key === "New York Giants") {
            return ["New York Jets", "New York Giants"];
        } else if (key === "Los Angeles Rams" || key === "Los Angeles Chargers") {
            return ["Los Angeles Rams", "Los Angeles Chargers"];
        } else {
            return [key];
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
            {
                description: "Additional stadiums",
                questions: [
                    NflTeam.NFL_MEXICO_GAME,
                    NflTeam.HALL_OF_FAME_GAME,
                    NflTeam.NFL_LONDON_GAME,
                    NflTeam.NFL_LONDON_GAME2,
                ].map((team) => NflTeam[team]),
            },
            {
                description: "AFC",
                questions: [
                    NflTeam.BUFFALO_BILLS,
                    NflTeam.MIAMI_DOLPHINS,
                    NflTeam.NEW_ENGLAND_PATRIOTS,
                    NflTeam.NEW_YORK_JETS,
                    NflTeam.BALTIMORE_RAVENS,
                    NflTeam.CINCINNATI_BENGALS,
                    NflTeam.CLEVELAND_BROWNS,
                    NflTeam.PITTSBURGH_STEELERS,
                    NflTeam.HOUSTON_TEXANS,
                    NflTeam.INDIANAPOLIS_COLTS,
                    NflTeam.JACKSONVILLE_JAGUARS,
                    NflTeam.TENNESSEE_TITANS,
                    NflTeam.DENVER_BRONCOS,
                    NflTeam.KANSAS_CITY_CHIEFS,
                    NflTeam.LAS_VEGAS_RAIDERS,
                    NflTeam.LOS_ANGELES_CHARGERS,
                ].map((team) => NflTeam[team]),
            },
            {
                description: "NFC",
                questions: [
                    NflTeam.DALLAS_COWBOYS,
                    NflTeam.NEW_YORK_GIANTS,
                    NflTeam.PHILADELPHIA_EAGLES,
                    NflTeam.WASHINGTON_FOOTBALL_TEAM,
                    NflTeam.CHICAGO_BEARS,
                    NflTeam.DETROIT_LIONS,
                    NflTeam.GREEN_BAY_PACKERS,
                    NflTeam.MINNESOTA_VIKINGS,
                    NflTeam.ATLANTA_FALCONS,
                    NflTeam.CAROLINA_PANTHERS,
                    NflTeam.NEW_ORLEANS_SAINTS,
                    NflTeam.TAMPA_BAY_BUCCANEERS,
                    NflTeam.ARIZONA_CARDINALS,
                    NflTeam.LOS_ANGELES_RAMS,
                    NflTeam.SAN_FRANCISCO_49ERS,
                    NflTeam.SEATTLE_SEAHAWKS,
                ].map((team) => NflTeam[team]),
            },
            {
                description: "Banks",
                questions: [
                    NflTeam.CAROLINA_PANTHERS,
                    NflTeam.BALTIMORE_RAVENS,
                    NflTeam.JACKSONVILLE_JAGUARS,
                    NflTeam.MINNESOTA_VIKINGS,
                ].map((team) => NflTeam[team]),
            },
        ];
    };
})();
