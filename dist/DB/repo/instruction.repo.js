"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InstructionRepo {
    constructor() {
        this.stringToReplace = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
    }
    findAll(user) {
        const instructions = {};
        instructions['html'] = this.getHtml();
        instructions['javascript'] = this.getJavascript(user.analyticToken);
        return instructions;
    }
    getHtml() {
        return [`<div id="horizontal-analytic-banner"></div>`,
            `<div id="vertical-analytic-banner"></div>`,
            `<div id="mobile-analytic-banner"></div>`];
    }
    getJavascript(token) {
        const fs = require('fs');
        const analyticCodePath = process.env.NODE_ENV === 'production' ? 'analitycscode/customerCode/init.prod.js' : 'analitycscode/customerCode/init.min.js';
        const code = fs.readFileSync(analyticCodePath, 'utf8');
        return code.replace(this.stringToReplace, token);
    }
}
exports.InstructionRepo = InstructionRepo;
//# sourceMappingURL=instruction.repo.js.map