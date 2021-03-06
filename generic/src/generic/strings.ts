export const areStringsSimilar = (s1: string, s2: string): boolean => {
    const stringSimilarity = getStringSimilarity(standardizeString(s1), standardizeString(s2));
    return stringSimilarity >= 0.6;
};

const getStringSimilarity = (s1: string, s2: string): number => {
    // If they don't start with the same letter, the guess is way off anyway
    if (s1[0] != s2[0]) return 0;

    return 1 - (levenshteinDistance(s1, s2) * 1.0) / s1.length;
};

const wordsToIgnore = ["the", "and", "of", "an", "a", "from", "in"];
export const standardizeString = (s: string): string => {
    return s
        .toLowerCase()
        .split(" ")
        .filter((word) => !wordsToIgnore.includes(word))
        .join("")
        .replace(/[^0-9a-zA-Z]/g, "");
};

/*
MIT License

Copyright (c) 2017 Gustaf Andersson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/* eslint-disable */
const _min = (d0: number, d1: number, d2: number, bx: number, ay: number): number => {
    return d0 < d1 || d2 < d1 ? (d0 > d2 ? d2 + 1 : d0 + 1) : bx === ay ? d1 : d1 + 1;
};

const levenshteinDistance = (a: string, b: string): number => {
    if (a === b) {
        return 0;
    }

    if (a.length > b.length) {
        var tmp = a;
        a = b;
        b = tmp;
    }

    var la = a.length;
    var lb = b.length;

    while (la > 0 && a.charCodeAt(la - 1) === b.charCodeAt(lb - 1)) {
        la--;
        lb--;
    }

    var offset = 0;

    while (offset < la && a.charCodeAt(offset) === b.charCodeAt(offset)) {
        offset++;
    }

    la -= offset;
    lb -= offset;

    if (la === 0 || lb < 3) {
        return lb;
    }

    var x = 0;
    var y;
    var d0;
    var d1;
    var d2;
    var d3;
    var dd = 0;
    var dy;
    var ay;
    var bx0;
    var bx1;
    var bx2;
    var bx3;

    var vector = [];

    for (y = 0; y < la; y++) {
        vector.push(y + 1);
        vector.push(a.charCodeAt(offset + y));
    }

    var len = vector.length - 1;

    for (; x < lb - 3; ) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        bx1 = b.charCodeAt(offset + (d1 = x + 1));
        bx2 = b.charCodeAt(offset + (d2 = x + 2));
        bx3 = b.charCodeAt(offset + (d3 = x + 3));
        dd = x += 4;
        for (y = 0; y < len; y += 2) {
            dy = vector[y];
            ay = vector[y + 1];
            d0 = _min(dy, d0, d1, bx0, ay);
            d1 = _min(d0, d1, d2, bx1, ay);
            d2 = _min(d1, d2, d3, bx2, ay);
            dd = _min(d2, d3, dd, bx3, ay);
            vector[y] = dd;
            d3 = d2;
            d2 = d1;
            d1 = d0;
            d0 = dy;
        }
    }

    for (; x < lb; ) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        dd = ++x;
        for (y = 0; y < len; y += 2) {
            dy = vector[y];
            vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
            d0 = dy;
        }
    }

    return dd;
};
