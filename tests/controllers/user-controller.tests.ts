import app from "../../lib/app"
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { UserRepo } from "../../lib/DB/repo/user.repo";
import { createConnection } from "typeorm";
chai.use(chaiHttp);
const expect = chai.expect;

describe('USER CONTROLLER TESTS', () => {
    before( async () => {
        try{
            await UserRepo.create({id:123456,password:'test',role:'Admin'});
        }
        catch (error){
            console.log(error)
        }
    })
    after(async () =>  {
        try{
            await UserRepo.delete(123456);
        }
        catch (error){
            console.log(error)
        }
    })

    describe('POST authenticate', async () => {
        it('should return a valid token when valid credentials are sent', async () =>  {
            const response = await chai.request(app).post('/authenticate')
            .send({id:123456,password:'test'})
            expect(response).to.have.status(200);
        });

        it('should return an error when invalid credentials are sent', async () =>  {
            const response = await chai.request(app).post('/authenticate')
            .send({id:-1,password:'test'})
            expect(response).to.have.status(401);
        });
    });
  });

