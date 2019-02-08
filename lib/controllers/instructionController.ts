import {Request, Response} from 'express';
import {InstructionService} from "../service/instruction.service";
import {WebsiteurlService} from '../service/websiteurl.service';

export class InstructionController {
    private instructionService: InstructionService = new InstructionService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async index(req: Request, res: Response) {
        const instructions = await this.instructionService.getInstructions();
        console.log(instructions);
        res.render('instruction/index', {instructions: instructions});
    }


    public async getInstructionPage(req: Request, res: Response, next) {
        try {
            let instruction: any;
            if (req.params.id) {
                instruction = await this.instructionService.getInstructionById(req.params.id);
            }
            //TODO remove below?
            res.render('instruction/edit', {instruction: instruction});
        } catch (error) {
            return res.json(error).status(500);
        }
    }


}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.