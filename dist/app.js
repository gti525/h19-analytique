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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const https = require("https");
const fs = require("fs");
const PORT = 3000;
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};
class App {
    //TODO export routes to configs
    constructor() {
        this.routePrv = new routes_1.Routes();
        typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.app = express();
                this.app.set('notready', true);
                this.config();
                this.routePrv.routes(this.app);
                https.createServer(httpsOptions, this.app).listen(PORT, () => {
                    console.log('Express server listening on port ' + PORT);
                });
                console.log("Up and running");
                this.app.set('notready', false);
            }
            catch (e) {
                console.log("ERROR ON START", e);
            }
        })).catch(error => console.log("TypeORM connection error: ", error));
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        process.on('uncaughtException', (err) => {
            console.log('uncaughtException', err);
        });
        process.on('unhandledRejection', (err) => {
            console.log('unhandledRejection', err);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map