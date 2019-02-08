export class EnumsToArray {
    translateEnumToSelectArray(_enum: any, filter: (value: any, index?: number, Array?: any[]) => boolean = Object) : any{
        return Object.keys(_enum).filter(function(n) { return !isNaN(n as any); }).filter(filter).map(key => { return { "key": key, "text": _enum[key] } });
    }
}
