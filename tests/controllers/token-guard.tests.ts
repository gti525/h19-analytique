const app = require("../../lib/app")
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { UserRepo } from "../../lib/DB/repo/user.repo";
import { UserRoles } from '../../lib/models/enums/role-enums';
import { UserService } from '../../lib/service/user.service';
chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;

describe('TOKEN GUARD TESTS', () => {
    before( async () => {
        try{
            const userService = new UserService();
            await userService.adduser({id:777,password:'test',role:UserRoles.ADMIN});
        }
        catch (error){
            console.log(error)
        }
    })
    after(async () =>  {
        try{
            await UserRepo.delete(777);
            await UserRepo.delete(234567)
        }
        catch (error){
            console.log(error)
        }
    })

    describe('POST valid user creation', async () => {
        it('should allow the admin to create a user if the token is valid', async () =>  {
            let response = await chai.request('https://localhost:3000').post('/authenticate')
            .send({id:777,password:'test'})
            const token = response.body;

            response = await chai.request('https://localhost:3000')
            .post('/user')
            .set('x-access-token',token)
            .send({id:23456,password:'test',role:UserRoles.ADMIN})
            expect(response).to.have.status(200);
            assert.isDefined(response.body)
        });

        it('should not-allow user creation if the token is missing', async () =>  {
            const response = await chai.request('https://localhost:3000')
            .post('/user')
            .send({id:5646546,password:'test',role:UserRoles.ADMIN})
            expect(response).to.have.status(403);
            assert.strictEqual(response.error.text,'Missing token')
        });
        it('should not-allow user creation if the token is invalid', async () =>  {
            const token = "bad token"
            const response = await chai.request('https://localhost:3000')
            .post('/user')
            .set('x-access-token',token)
            .send({id:5646546,password:'test',role:UserRoles.ADMIN})
            expect(response).to.have.status(403);
            assert.strictEqual(response.error.text,'Invalid token')
        });
    });
  });

