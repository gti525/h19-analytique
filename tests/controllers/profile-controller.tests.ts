const app = require("../../lib/app")
import * as chai from 'chai';
import * as _ from 'lodash'
import chaiHttp = require('chai-http');
import 'mocha';
import { UserRepo } from "../../lib/DB/repo/user.repo";
import { UserService } from '../../lib/service/user.service';
import { TokenService } from '../../lib/service/token.service';
import { UserRoles } from '../../lib/models/enums/role-enums';
import { Profile } from '../../lib/DB/entity/profile.entitiy';
import { WebSiteUrl } from '../../lib/DB/entity/websiteurl.entity';
import { ProfileRepo } from '../../lib/DB/repo/profile.repo';
import { ProfileService } from '../../lib/service/profile.service'

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;
let token = '';
const profile = new Profile();
const websiteurl1 = new WebSiteUrl();
websiteurl1.url = 'www.test1.com'
const websiteurl2 = new WebSiteUrl();
websiteurl2.url = 'www.test2.com'
profile.name = ('TEST-PROFILE' as any)
//profile.url = [websiteurl1, websiteurl2];
profile.url = websiteurl2.url;
const profilesIdToDelete = [];
let profileService: ProfileService = undefined;
describe('PROFILE CONTROLLER TESTS', () => {
    before(async () => {
        try {
            const userService = new UserService();
            await userService.adduser({ id: 555, password: 'test', role: UserRoles.ADMIN, username : "TestUser"});
            token = TokenService.createToken(555, UserRoles.ADMIN);
            profileService = new ProfileService();
        }
        catch (error) {
            console.log(error)
        }
    })
    after(async () => {
        try {
            await UserRepo.delete(555);
            for (const id of profilesIdToDelete) {
                await ProfileRepo.deleteById(id);
            }
        }
        catch (error) {
            console.log(error)
        }
    })

    /*describe('PUT /profile', () => {
        it('should allow the admin to update a profile if the token is valid', async () => {
            let p = _.cloneDeep(profile);
            let w = _.cloneDeep(profile.websiteurls[0]);
            p.name = "TEST-PUT-ID-1"
            p = await profileService.addProfile(p);
            profilesIdToDelete.push(p.id);
            p.name = "AFTER-PUT";
            p.websiteurls[0].url='FIRST-URL-MODIFIED'
            w.url = 'NEW-URL'
            p.websiteurls.push(w)
            const response = await chai.request('https://localhost:3000')
                .put('/profile')
                .set('x-access-token', token)
                .send(p);
            expect(response).to.have.status(200);
            assert.isDefined(response.body)
            assert.strictEqual(response.body.id, p.id);
            assert.strictEqual(response.body.profile, p.profile);

            assert.strictEqual(response.body.websiteurls[0].url, p.websiteurls[0].url);
            assert.strictEqual(response.body.websiteurls[2].url, w.url);
        });

        it('should allow the admin to remove an url from a profile and put it back if the token is valid', async () => {
            let p = _.cloneDeep(profile);
            let w = _.cloneDeep(profile.websiteurls[0]);
            p.profile = "TEST-PUT-ID-2"
            p.websiteurls = [w];
            p = await profileService.addProfile(p);
            profilesIdToDelete.push(p.id);
            delete p.websiteurls;
            // First remove
            let response = await chai.request('https://localhost:3000')
                .put('/profile')
                .set('x-access-token', token)
                .send(p);
            expect(response).to.have.status(200);
            assert.isDefined(response.body)
            assert.isUndefined(response.body.websiteurls)
            // Then readd
            p.websiteurls = [w];
            response = await chai.request('https://localhost:3000')
                .put('/profile')
                .set('x-access-token', token)
                .send(p);
            expect(response).to.have.status(200);
            assert.isDefined(response.body)
            assert.strictEqual(response.body.websiteurls[0].url, w.url);
        });
    });

    describe('DELETE /profile', () => {
        it('should allow the admin to delete a profile if the token is valid', async () => {
            let p = _.cloneDeep(profile);
            p.profile = "TEST-DELETE-ID"
            p = await profileService.addProfile(p);
            profilesIdToDelete.push(p.id);
            const response = await chai.request('https://localhost:3000')
                .delete(`/profile?id=${p.id}`)
                .set('x-access-token', token);
            expect(response).to.have.status(204);
            assert.isUndefined(await profileService.getProfileById(p.id));
        });
        it('should not work if the id is invalid', async () => {
            const response = await chai.request('https://localhost:3000')
                .delete(`/profile?id=${-1}`)
                .set('x-access-token', token);
            expect(response).to.have.status(404);
        });
        it('should not work if the id is missing', async () => {
            const response = await chai.request('https://localhost:3000')
                .delete(`/profile`)
                .set('x-access-token', token);
            expect(response).to.have.status(400);
        });
    });

    describe('POST /profile', () => {
        it('should allow the admin to create a profile if the token is valid', async () => {
            const response = await chai.request('https://localhost:3000')
                .post('/profile')
                .set('x-access-token', token)
                .send(profile)
            expect(response).to.have.status(200);
            profilesIdToDelete.push(response.body.id);
            assert.isDefined(response.body)
            assert.isDefined(response.body.id);
            assert.strictEqual(response.body.profile, 'TEST-PROFILE');

            assert.strictEqual(response.body.websiteurls[0].url, 'www.test1.com');
            assert.strictEqual(response.body.websiteurls[1].url, 'www.test2.com');
        });

        it('should allow the admin to create a profile if the token is valid and it has no websiteurl', async () => {
            const p = _.cloneDeep(profile);
            delete p.websiteurls;
            p.profile = "TEST-URL"
            const response = await chai.request('https://localhost:3000')
                .post('/profile')
                .set('x-access-token', token)
                .send(p)
            expect(response).to.have.status(200);
            profilesIdToDelete.push(response.body.id);
            assert.isDefined(response.body)
            assert.isDefined(response.body.id);
            assert.strictEqual(response.body.profile, 'TEST-URL');
        });

        it('should not allow the admin to create a profile if it is invalid', async () => {
            const p = _.cloneDeep(profile);
            delete p.profile;
            const response = await chai.request('https://localhost:3000')
                .post('/profile')
                .set('x-access-token', token)
                .send(p)
            expect(response).to.have.status(400);
            assert.include(response.error.text, 'The profile is not valid');
        });
        it('should not allow the admin to create a profile if the websiteurl is invalid', async () => {
            const p = _.cloneDeep(profile);
            p.profile = "invalid profile"
            delete p.websiteurls[0].url;
            const response = await chai.request('https://localhost:3000')
                .post('/profile')
                .set('x-access-token', token)
                .send(p)
            expect(response).to.have.status(400);
            assert.include(response.error.text, 'The website url is not valid');
        });

    });
    describe('GET /profile', () => {
        it('should get the profile if the id is valid', async () => {
            let p = _.cloneDeep(profile);
            p.id = 123;
            p.profile = "TEST-GET-ID"
            p = await profileService.addProfile(p);
            profilesIdToDelete.push(p.id);
            const response = await chai.request('https://localhost:3000')
                .get('/profile?id=123')
                .set('x-access-token', token)
                .send();
            expect(response).to.have.status(200);
            assert.isDefined(response.body)
            assert.strictEqual(response.body.id, p.id);
            assert.strictEqual(response.body.profile, p.profile);

            assert.strictEqual(response.body.websiteurls[0].url, 'www.test1.com');
            assert.strictEqual(response.body.websiteurls[1].url, 'www.test2.com');
            profilesIdToDelete.push(response.body.id);
        });
        it('should get the profile if the websiteurl is valid', async () => {
            let p2 = _.cloneDeep(profile);
            let p1 = _.cloneDeep(profile);
            p1.profile = "TEST-GET-URL1"
            p2.profile = "TEST-GET-URL2"
            p1.websiteurls[0].url = "www.testurl.ca"
            p2.websiteurls[0].url = "www.testurl.ca"
            p1 = await profileService.addProfile(p1);
            p2 = await profileService.addProfile(p2);
            profilesIdToDelete.push(p1.id);
            profilesIdToDelete.push(p2.id);
            const url = p1.websiteurls[0].url;

            const response = await chai.request('https://localhost:3000')
                .get(`/profile?url=${url}`)
                .set('x-access-token', token)
                .send();
            expect(response).to.have.status(200);
            console.log(JSON.stringify(response.body));
            assert.isDefined(response.body)
            assert.strictEqual(response.body.url, url);
            assert.lengthOf(response.body.profiles, 2);
        });
        it('should get the profile if the profile type is valid', async () => {
            let p = _.cloneDeep(profile);
            p.profile = 'TEST-PROFILE-TYPE';
            p = await profileService.addProfile(p);
            profilesIdToDelete.push(p.id);
            const response = await chai.request('https://localhost:3000')
                .get(`/profile?profile=${p.profile}`)
                .set('x-access-token', token)
                .send();
            expect(response).to.have.status(200);
            assert.isDefined(response.body)
            assert.strictEqual(response.body.id, p.id);
            assert.strictEqual(response.body.profile, p.profile);

            assert.strictEqual(response.body.websiteurls[0].url, 'www.test1.com');
            assert.strictEqual(response.body.websiteurls[1].url, 'www.test2.com');
        });
        it('should not get any profile if the id is invalid', async () => {
            const response = await chai.request('https://localhost:3000')
                .get('/profile?id=999')
                .set('x-access-token', token)
                .send();
            expect(response).to.have.status(404);
        });

        it('should not get any profile if the url is invalid', async () => {
            const response = await chai.request('https://localhost:3000')
                .get('/profile?url=999')
                .set('x-access-token', token)
                .send();
            expect(response).to.have.status(404);
        });

        it('should not get any profile if the profile is invalid', async () => {
            const response = await chai.request('https://localhost:3000')
                .get('/profile?profile=999')
                .set('x-access-token', token)
                .send();
            expect(response).to.have.status(404);
        });
    });*/
});

