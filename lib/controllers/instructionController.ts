import {Request, Response} from 'express';
import {InstructionService} from "../service/instruction.service";
import { BaseController } from './baseController';

export class InstructionController extends BaseController{
    private instructionService: InstructionService = new InstructionService();

    public async index(req: Request, res: Response) {
        const instructions = this.instructionService.getInstructions(await this.getUser(req));
        await this.sendResponse(req,res,'instruction/index', {instructions})
    }
}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.