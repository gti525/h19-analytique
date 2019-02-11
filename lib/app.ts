import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import { InitService } from "./service/init.service";
import * as https from 'https';
import * as fs from 'fs';
import * as nodeSassMiddleware from "node-sass-middleware";
import * as path from "path";
import serveStatic = require("serve-static");
const PORT = 3000;
const HOST = "localhost";
const cookieParser = require('cookie-parser');
const session = require('express-session');

const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')

};
class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    constructor() {
        createConnection().then(async connection => {
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
                    })
                }
                else {
                    this.app.listen(process.env.PORT || PORT, () => {
                        InitService.initDB();
                        console.log('Express server listening on port ' + PORT);
                    })
                }
            }
            catch (e) { console.log("ERROR ON START", e) }
        }).catch(error => console.log("TypeORM connection error: ", error));
    }

    private config(): void {
        //Cookie parser
        this.app.use(cookieParser());
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //sass middleware support
        this.app.use(nodeSassMiddleware({
            src: __dirname + '/public/styles/sass',
            dest: __dirname + '/public/styles',
            debug: true,
            outputStyle: 'compressed',
            indentedSyntax: true,
            //sourceMap: true,
            prefix:  '/styles'
        }));
        this.app.use('/', serveStatic(path.join(__dirname, 'public')));
        //session
        this.app.use(session({
            key: 'user_sid',
            secret: 'thisisasecret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 60000
            }
        }));

        process.on('uncaughtException', (err) => {
            console.log('uncaughtException in app.ts', err);
        });
        process.on('unhandledRejection', (err) => {
            console.log('unhandledRejection in app.ts', err);
        });
    }
}

export default new App().app;