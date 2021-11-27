import { shuffle } from "./utils";
import type { QuestionSet } from "./utils";
import * as storage from "./storage";

export abstract class QuestionSetHandler {
    eligibleQuestions!: string[];

    abstract questionType: string;
    abstract allQuestions: string[];

    abstract isCorrectAnswer: (expected: string, actual: string) => boolean;

    abstract getQuestionSets: () => QuestionSet[];

    /** Returns an "offical" version of `guess` used for standardization purposes. For example:
     * "us" => "United States"
     * "usa" => "United States"
     * "Canada" => "Canada"
     * "asdf" => undefined
     */
    abstract getOfficialName: (guess: string) => string | undefined;

    doesGuessExist = (guess: string): boolean => {
        return this.allQuestions.includes(guess);
    };

    getQuestionSet = (questionSetString: string): string[] => {
        const questionSets = this.getQuestionSets();
        for (let i = 0; i < questionSets.length; i++) {
            if (questionSetString === questionSets[i].description) {
                return shuffle([...questionSets[i].questions]);
            }
        }
        return shuffle([...questionSets[0].questions]);
    };

    /** Returns length of new eligible questions list */
    recalculateEligibleQuestions = (): number => {
        const mode = storage.getMode();
        let questionSet = this.getQuestionSet(storage.getQuestionSetString());

        if (mode == "Show unseen mode") {
            const seenQuestions = Object.keys(localStorage);
            questionSet = questionSet.filter((question) => !seenQuestions.includes(question));
        } else if (mode == "Show unknown mode") {
            questionSet = questionSet.filter((question) => {
                const stats = storage.getStats(question);
                return stats ? stats.percentCorrect < 0.6 || stats.numCorrectGuesses < 2 : true;
            });
        }

        if (questionSet.length == 0) {
            const allQuestions = shuffle(this.getQuestionSet("All"));
            questionSet = allQuestions;
        }

        this.eligibleQuestions = questionSet;
        return this.eligibleQuestions.length;
    };

    getNextQuestion = (numQuestionsAnswered: number, currentQuestion?: string): string => {
        let result: string;

        if (numQuestionsAnswered % 5 == 0 && storage.getShouldReshowUnknown()) {
            const questionSet = this.getQuestionSet(storage.getQuestionSetString());
            for (let i = 0; i < questionSet.length; i++) {
                const stats = storage.getStats(questionSet[i]);
                if (stats && questionSet[i] != currentQuestion && stats.percentCorrect < 0.6) {
                    result = questionSet[i];
                    return result;
                }
            }
        }

        if (this.eligibleQuestions.length == 0) this.recalculateEligibleQuestions();
        result = this.eligibleQuestions.pop()!;
        return result;
    };
}
