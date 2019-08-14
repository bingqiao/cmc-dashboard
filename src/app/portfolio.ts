export class Portfolio {
    name: string;
    id: string;
    currencies?: {[key: string] : number};

    constructor(option?: Portfolio) {
        Object.assign(this, option);
    }
}
