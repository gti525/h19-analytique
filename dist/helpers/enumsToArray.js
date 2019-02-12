"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnumsToArray {
    translateEnumToSelectArray(_enum, filter = Object) {
        return Object.keys(_enum).filter(function (n) { return !isNaN(n); }).filter(filter).map(key => { return { "key": key, "text": _enum[key] }; });
    }
}
exports.EnumsToArray = EnumsToArray;
//# sourceMappingURL=enumsToArray.js.map