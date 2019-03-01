"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_service_1 = require("../service/profile.service");
const profile_entitiy_1 = require("../DB/entity/profile.entitiy");
const websiteurl_entity_1 = require("../DB/entity/websiteurl.entity");
const baseController_1 = require("./baseController");
class ProfileController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.profileService = new profile_service_1.ProfileService();
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const profiles = yield this.profileService.getProfilesByUser(yield this.getUser(req));
            res.render('profile/index', { profiles });
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method !== 'GET' && req.method !== 'POST') {
                return next();
            }
            if (req.method == 'GET') {
                res.render('profile/create');
            }
            else {
                try {
                    const urls = [];
                    req.body.urls.forEach(function (url) {
                        const websiteUrl = new websiteurl_entity_1.WebSiteUrl();
                        websiteUrl.url = url;
                        urls.push(websiteUrl);
                    });
                    const profile = new profile_entitiy_1.Profile();
                    profile.identifier = req.body.identifier;
                    profile.type = req.body.type;
                    profile.urls = urls;
                    profile.user = yield this.getUser(req);
                    yield this.profileService.addProfile(profile);
                    res.redirect("/profile");
                }
                catch (error) {
                    return res.json(error).status(500);
                }
            }
        });
    }

    validateProfile(req, res, next){

        var profile = new profile_entitiy_1.Profile();
        profile.identifier = req.body.identifier;
        profile.type = req.body.type;
        profile.urls = urls;

        req.checkBody('identifier', 'Name is required').notEmpty();
        req.checkBody('type', 'type is required').notEmpty();

    }


    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method !== 'GET' && req.method !== 'POST') {
                return next();
            }
            if (req.method == 'GET') {
                try {
                    let profile;
                    if (req.params.id) {
                        profile = yield this.profileService.getProfileById(req.params.id);
                    }
                    res.render('profile/edit', { profile: profile });
                }
                catch (error) {
                    return res.json(error).status(500);
                }
            }
            else {
                try {
                    const profile = yield this.profileService.getProfileById(req.body.id);
                    if (profile) {
                        const urls = [];
                        req.body.urls.forEach(function (url) {
                            const websiteUrl = new websiteurl_entity_1.WebSiteUrl();
                            websiteUrl.url = url;
                            urls.push(websiteUrl);
                        });
                        profile.identifier = req.body.identifier;
                        profile.type = req.body.type;
                        profile.urls = urls;
                        yield this.profileService.updateProfile(profile);
                        res.render("profile/edit", { profile: profile });
                    }
                }
                catch (error) {
                    return res.json(error).status(500);
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    yield this.profileService.deleteProfile(req.params.id);
                    res.redirect("/profile");
                }
                else {
                    res.status(400).json(`no id was provided`);
                }
            }
            catch (error) {
                return res.json(error).status(500);
            }
        });
    }
}
exports.ProfileController = ProfileController;
//ACM 499 token required, c'est le code a renvoyer si on a pas de token.
//# sourceMappingURL=profileController.js.map