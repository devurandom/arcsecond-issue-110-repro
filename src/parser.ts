import {
    char,
    letters,
    Parser,
    possibly,
    sepBy,
    sequenceOf,
} from "arcsecond";

const customSepByWithSequenceOf = <T>(separatorParser: Parser<string>) => (valueParser: Parser<T>) =>
    sequenceOf([
        sepBy(separatorParser)(valueParser) as Parser<T>,//<< https://github.com/francisrstokes/arcsecond/issues/109
        possibly(separatorParser),
    ]).map(([values, _]) => values);

export const parse = (input: string) => customSepByWithSequenceOf(char(","))(letters).run(input);
