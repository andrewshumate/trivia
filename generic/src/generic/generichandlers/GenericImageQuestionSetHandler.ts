import { GenericQuestionSetHandler } from "./GenericQuestionSetHandler";

export class GenericImageQuestionSetHandler extends GenericQuestionSetHandler {
    constructor(public questionType: string, public answerType: string, public allData: Map<string, string[]>) {
        super(questionType, answerType, allData);
    }

    convertKeyToOfficialGuess = (key: string): string => {
        return key.split("/")[2].split(".")[0].split(",")[0];
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
