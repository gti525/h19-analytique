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
const nodeSassMiddleware = require("node-sass-middleware");
const path = require("path");
const PORT = 3000;
const HOST = "localhost";
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.app = express();
                //view engine setup
                this.app.set('views', path.join(__dirname, 'views'));
                this.app.set('view engine', 'pug');
                this.config();
                this.routePrv.routes(this.app);
                if (process.env.NODE_ENV === 'test') {
                    https.createServer(httpsOptions, this.app).listen(PORT, HOST, () => {
                        console.log('Express server listening on port ' + PORT);
                        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                    });
                }
                else {
                    this.app.listen(PORT, () => {
                        console.log('Express server listening on port ' + PORT);
                    });
                }
            }
            catch (e) {
                console.log("ERROR ON START", e);
            }
        })).catch(error => console.log("TypeORM connection error: ", error));
        setTimeout(function () {
            console.log('starting');
        }, 6000);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //sass middleware support
        this.app.use(nodeSassMiddleware({
            src: __dirname + 'public',
            dest: __dirname + 'public',
            indentedSyntax: true,
            sourceMap: true
        }));
        this.app.use(express.static('public'));
        process.on('uncaughtException', (err) => {
            console.log('uncaughtException in app.ts', err);
        });
        process.on('unhandledRejection', (err) => {
            console.log('unhandledRejection in app.ts', err);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map