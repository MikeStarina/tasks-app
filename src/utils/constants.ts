import { IPrint } from "./types"
import { TPrintParams } from "./types"

export type TSewingOptions = Array<
    {
        name: string,
        neckClosure: Array<
            {
                tagName: string,
                label: string,
                name: string,
                status: boolean,
            } 
        >,
        neckSewing: Array<
            {
                tagName: string,
                label: string,
                name: string,
                status: boolean,
            } 
        >,
        flatlock: Array<
            {
                tagName: string,
                label: string,
                name: string,
                status: boolean,
            } 
        >,
        
    }
>
export const sewingOptions: TSewingOptions = [
    {
        name: 'Футболка',
        neckClosure: [
            {
                tagName: 'mainFabricManual',
                label: 'Основная ткань (ручное)',
                name: 'neckClosure',
                status: false
            },
            {
                tagName: 'tapeManual',
                label: 'Тесьма',
                name: 'neckClosure',
                status: false
            },
            {
                tagName: 'none',
                label: 'Без закрытия',
                name: 'neckClosure',
                status: true
            },
        ],
        neckSewing: [
            {
                tagName: 'flatlock',
                label: 'Распошив горловины',
                name: 'neckSewing',
                status: false
            },
            {
                tagName: 'singlestich',
                label: 'Отстрочка горловины',
                name: 'neckSewing',
                status: false
            },
            {
                tagName: 'none',
                label: 'Без обработки',
                name: 'neckSewing',
                status: true
            },
        ],
        flatlock: [
            {
                tagName: 'armhole',
                label: 'Распошив пройм',
                name: 'flatlock',
                status: false
            },
        ]

    },
    {
        name: 'Худи',
        neckClosure: [
            {
                tagName: 'tapeManual',
                label: 'Тесьма',
                name: 'neckClosure',
                status: false,

            },
            {
                tagName: 'none',
                label: 'Без закрытия',
                name: 'neckClosure',
                status: true,
            },
        ],
        neckSewing: [
            {
                tagName: 'flatlock',
                label: 'Распошив горловины',
                name: 'neckSewing',
                status: false,
            },
            {
                tagName: 'singlestich',
                label: 'Отстрочка горловины',
                name: 'neckSewing',
                status: false
            },
            {
                tagName: 'none',
                label: 'Без обработки',
                name: 'neckSewing',
                status: true
            },
        ],
        flatlock: [
            {
                tagName: 'armhole',
                label: 'Распошив пройм',
                name: 'flatlock',
                status: false
            },
            {
                tagName: 'cuff',
                label: 'Распошив манжет',
                name: 'flatlock',
                status: false
            },
            {
                tagName: 'belt',
                label: 'Распошив пояса',
                name: 'flatlock',
                status: false
            },
        ]

    },
]




export const initialPrintState: IPrint = {
    method: '',
    printWidth: '',
    printHeight: '',
    position: '',
    printMargins: '',
    comments: '',
    printPreview: null,
    mockup: null,
    sizes: [{ size: 'XS', qty: ''}, { size: 'S', qty: ''}, { size: 'M', qty: ''}, { size: 'L', qty: ''}, { size: 'XL', qty: ''}, { size: 'XXL', qty: ''}, { size: 'XXXL', qty: ''}],
}





export const printParams: Array<TPrintParams> = [
    {
        method: 'Шелкография',
        params: {
            pantoneColors: '',
            isAntimigration: false,
            isCMYK: false,
            isStretch: false,
            specialEffects: '',
        }
        
    },
    {
        method: 'Вышивка',
        params: {
            threadsColors: '',
        }
        
    },
    {
        method: 'Термотрансфер',
        params: {
            specialEffects: '',
        }
        
    },
]