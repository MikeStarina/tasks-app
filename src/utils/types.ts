export interface IPrintParams {
    pantoneColors?: string,
    isAntimigration?: boolean,
    isCMYK?: boolean,
    isStretch?: boolean,
    specialEffects?: string,
    threadsColors?: string,
}




export type IPrint = {
        method: string,
        printWidth: string,
        printHeight: string,
        position: string,
        printMargins: string,
        params?: IPrintParams,
        comments: string,
        printPreview?: any,
        mockup?: any,
        sizes: Array<
        {
            size: string;
            qty: string;
        }
    >;
}

export type TPrintParams = Pick<IPrint, 'method' | 'params'>;