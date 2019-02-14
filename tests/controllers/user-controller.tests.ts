// const app = require("../../lib/app")
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';
// import { UserService } from "../../lib/service/user.service";
// import { UserRepo } from '../../lib/DB/repo/user.repo';
// import { UserRoles } from '../../lib/models/enums/role-enums';
// chai.use(chaiHttp);
// const expect = chai.expect;
// const assert = chai.assert;

// /**
//  * Used to start the server before running the tests.
//  */
// setTimeout(function() {
//     run()
//   }, 6000)

// describe('USER CONTROLLER TESTS', () => {
//     before( async () => {
//         try{
//             const userService = new UserService();
//             await userService.adduser({id:123456,password:'test',role:UserRoles.ADMIN, username: "Test User"});
//         }
//         catch (error){
//             console.log(error)
//         }
//     })
//     after(async () =>  {
//         try{
//             await UserRepo.delete(123456);
//         }
//         catch (error){
//             console.log(error)
//         }
//     })

//     describe('POST authenticate', async () => {
//         it('should return a valid token when valid credentials are sent', async () =>  {
//             const response = await chai.request('https://localhost:3000').post('/authenticate')
//             .send({id:123456,password:'test'})
//             expect(response).to.have.status(200);
//             assert.isDefined(response.body);
//         });

//         it('should return an error when invalid credentials are sent', async () =>  {
//             const response = await chai.request('https://localhost:3000').post('/authenticate')
//             .send({id:-1,password:'test'})
//             expect(response).to.have.status(401);
//             assert.strictEqual(response.error.text,"Invalid credentials")
//         });
//     });
//   });

