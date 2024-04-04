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
            printQty?: string;
        }
    > | undefined;
}

export type TPrintParams = Pick<IPrint, 'method' | 'params'>;

export type TUser = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    firstName: string,
    lastName: string
}

export type TLoginResponse = {
    jwt: string,
    user: TUser,
}

export type TPassport = {
    attributes: {
        createdAt: string,
        description: string,
        model_name: string,
        model_type: {
            data: {
                id: number,
                attributes: {
                    type: string,
                    [n: string]: any
                }
            }
        }
        name: string,
        pattern: string,
        sizes: { 
            data: Array<{
                id: number,
                attributes: {
                    name: string,
                    [n: string]: any
                }
            }>
        },
        updatedAt:string
    },
    id: number
} 

export type TPassportResponse = {
    data: Array<TPassport>;
    meta: any
}

export type TModelTypesResponse = {
    data: Array<{
        id: number,
        attributes: {
            type: string,
            [n: string]: any,
        }
    }>,
    meta: any,
}

export type TSupplier = {
    id: number,
    attributes: {
        name: string
    }
}

export type TSupplierResponse = {
    data: Array<TSupplier>,
    meta: any
}

export type TUploadResponse = {
    alternativeText: string | null,
    caption: string | null,
    createdAt: string,
    ext: string,
    formats: any,
    hash: string,
    height: number,
    id: number,
    mime: string,
    name: string,
    previewUrl: string | null,
    provider: string,
    provider_metadata: string | null,
    size: number,
    updatedAt: string,
    url: string,
    width: number,
}