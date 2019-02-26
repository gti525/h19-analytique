import { User } from "DB/entity/user.entitiy";

export class InstructionRepo {
    private stringToReplace ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
    public findAll(user: User): any {
        const instructions = {}
        instructions['html'] = this.getHtml();
        instructions['javascript'] = this.getJavascript(user.analyticToken);
        return instructions;
    }

    private getHtml(): string[]{
        return [`<div id="horizontal-analytic-banner"></div>`,
                `<div id="vertical-analytic-banner"></div>`,
                `<div id="mobile-analytic-banner"></div>`]
    }
    private getJavascript(token: string): string{
        const fs = require('fs');
        const analyticCodePath = process.env.NODE_ENV === 'production' ? 'analitycscode/customerCode/init.prod.js': 'analitycscode/customerCode/init.min.js';
        const code: string = fs.readFileSync(analyticCodePath, 'utf8');
        return code.replace(this.stringToReplace,token);
    }
}
