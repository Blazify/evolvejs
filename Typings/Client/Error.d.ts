import { codes } from '../Constants/Errors';
declare const symCode: unique symbol;
declare const EvolveErr: {
    new (code: codes, ...params: string[]): {
        [x: string]: any;
        readonly name: string;
        readonly code: string;
        [symCode]: string;
    };
    [x: string]: any;
};
declare const TypeErr: {
    new (code: codes, ...params: string[]): {
        [x: string]: any;
        readonly name: string;
        readonly code: string;
        [symCode]: string;
    };
    [x: string]: any;
};
declare const RangeErr: {
    new (code: codes, ...params: string[]): {
        [x: string]: any;
        readonly name: string;
        readonly code: string;
        [symCode]: string;
    };
    [x: string]: any;
};
export { EvolveErr, TypeErr, RangeErr };
