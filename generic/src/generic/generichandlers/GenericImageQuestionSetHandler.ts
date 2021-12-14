import { GenericQuestionSetHandler } from "./GenericQuestionSetHandler";

export class GenericImageQuestionSetHandler extends GenericQuestionSetHandler {
    constructor(public questionType: string, public answerType: string, public allData: Map<string, string[]>) {
        super(questionType, answerType, allData);
    }

    convertKeyToOfficialGuess = (key: string): string => {
        return key.split("/")[2].split(".")[0].split(",")[0];
    };

    /** Returns the keys for other images associated with the same question.
     * i.e. If "Evergreen tree" has images "Evergreen Tree.webp",
     * "Evergreen Tree (2).webp", "Evergreen Tree (3).webp", this function
     * will return all of those images. `key` will always be first in the
     * returned list.
     */
    getAllAssociatedKeys = (key: string): string[] => {
        const standardizedKey = key.split(".")[0].split("(")[0].trim();
        const allKeys = Array.from(this.allData.keys());
        const result: string[] = [key];

        for (let i = 0; i < allKeys.length; i++) {
            const standardizedOtherKey = allKeys[i].split(".")[0].split("(")[0].trim();
            if (standardizedKey === standardizedOtherKey && allKeys[i] !== key) {
                result.push(allKeys[i]);
            }
        }

        return result;
    };

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
