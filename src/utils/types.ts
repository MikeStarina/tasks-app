export type ISSParams = {
    pantoneColors: string,
    isAntimigration: boolean,
    isCMYK: boolean,
    isStretch: boolean,
    specialEffects: string,
    printPreview: Blob,
    mockup: Blob,
}
export type IEmbParams = {
    threadsColors: string,
}
export type IHTParams = {
    specialEffects: string,
}



export type IPrint = {
        method: string,
        printWidth: string,
        printHeight: string,
        position: string,
        printMargins: string,
        params?: ISSParams | IEmbParams | IHTParams,
        comments: string,
        printPreview?: any,
        mockup?: any,
}

export type TPrintParams = Pick<IPrint, 'method' | 'params'>;