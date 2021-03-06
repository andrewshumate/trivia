import { shuffle } from "./utils";
import type { QuestionSet } from "./utils";
import * as storage from "./storage";

export abstract class QuestionSetHandler {
    eligibleQuestions!: string[];

    numNonReshownQuestionsAnswered!: number;
    numEligibleQuestions!: number;

    private numAllQuestionsAnswered!: number;

    /** A description of what is shown to the user as the question. Contrast with `answerType`.
     * e.g.
     *  `questionType` = "Flag image"
     *  `answerType` = "Country name"
     */
    abstract questionType: string;

    /** A description of what the user types in to guess. Contrast with `questionType`.
     * e.g.
     *  `questionType` = "Flag image"
     *  `answerType` = "Country name"
     */
    abstract answerType: string;

    abstract isCorrectAnswer: (expected: string, actual: string) => boolean;

    abstract getQuestionSets: () => QuestionSet[];

    /** Returns an "offical" version of `guess` used for standardization purposes. For example:
     * "us" => "United States"
     * "usa" => "United States"
     * "Canada" => "Canada"
     * "asdf" => undefined
     */
    abstract getOfficialGuess: (guess: string) => string | undefined;

    /** Returns the key from a guess. The key and guess may be the same depending
     * on implementation. For example:
     * "United States" => ["United States"] (when the question is a flag image)
     * "Lumen Field" => ["Seattle Seahawks"]
     * "MetLife Stadium" => ["New York Giants", "New York Jets"]
     * "asdf" => []
     */
    abstract getKeysFromGuess: (guess: string) => string[];

    /**
     * Given a key `K`, returns a list [K, K_1, ..., K_n] where each
     * element is associated with K. Usually, this should just be [K],
     * but if there are multiple keys with the same value, this function
     * may be useful:
     * "Washington State" => "Olympia" (state capitals)
     * "New York Jets" -> ["New York Jets", "New York Giants"] (stadium names)
     */
    getAllAssociatedKeys = (key: string): string[] => {
        return [key];
    };

    /** Used in the results screen to determine if we should show the correct
     * answer for an incorrect guess, or instead say "(not a `questionType`)"
     */
    abstract doesGuessExist: (guess: string) => boolean;

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
    recalculateEligibleQuestions = (): void => {
        const mode = storage.getMode();
        let questionSet = this.getQuestionSet(storage.getQuestionSetString(this.questionType));

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
        this.numNonReshownQuestionsAnswered = -1;
        this.numAllQuestionsAnswered = -1;
        this.numEligibleQuestions = this.eligibleQuestions.length;
    };

    getNextQuestion = (currentQuestion?: string): string => {
        let result: string;

        if (
            this.numAllQuestionsAnswered > 1 && // Don't immediately reshow first incorrect answer
            this.numAllQuestionsAnswered % 5 == 0 &&
            this.eligibleQuestions.length > 5 && // Avoid excessive repeats when not a lot of questions
            storage.getShouldReshowUnknown()
        ) {
            const questionSet = this.getQuestionSet(storage.getQuestionSetString(this.questionType));
            for (let i = 0; i < questionSet.length; i++) {
                const stats = storage.getStats(questionSet[i]);
                if (stats && questionSet[i] != currentQuestion && stats.percentCorrect < 0.6) {
                    result = questionSet[i];
                    this.numAllQuestionsAnswered++;
                    return result;
                }
            }
        }

        if (this.eligibleQuestions.length == 0) this.recalculateEligibleQuestions();
        result = this.eligibleQuestions.pop()!;
        this.numNonReshownQuestionsAnswered = (this.numNonReshownQuestionsAnswered + 1) % this.numEligibleQuestions;
        this.numAllQuestionsAnswered++;
        return result;
    };
}
