import { standardizeString } from "../generic/strings";

export const files = (CAR_LOGO_FILES as string[]).map((fileName) => `carlogos/images/${fileName}`);
console.log(files);

function x(): Map<string, string> {
    const result: Map<string, string> = new Map();

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
        possibleNames.forEach((name) => result.set(standardizeString(name), possibleNames[0]));
    }

    return result;
}

export const possibleGuessToOfficialGuess = x();

export const convertKeyToOfficialGuess = (key: string): string => {
    return key.split("/")[2].split(".")[0].split(",")[0];
};

function y(): Map<string, string> {
    const result: Map<string, string> = new Map();

    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const possibleNames = fileName.split("/")[2].split(".")[0].split(",");
        result.set(possibleNames[0], fileName);
    }

    return result;
}

export const officalGuessToKey = y();

export function preload(imageArray: string[], index: number): void {
    index = index || 0;
    if (imageArray && imageArray.length > index) {
        const img = new Image();
        img.onload = function (): void {
            preload(imageArray, index + 1);
        };
        img.src = imageArray[index];
    }
}
