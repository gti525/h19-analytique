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
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const PORT = 3000;
const HOST = "localhost";
const { check } = require('express-validator/check')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')

};
class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    constructor() {
        this.setDbConfig()
        createConnection().then(async connection => {
            try {
                this.app = express();
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

    private setDbConfig(){
        console.log("setting up db configs")
        if (process.env.NODE_ENV === 'production') {
            process.env.TYPEORM_CONNECTION = "mariadb",
            process.env.TYPEORM_HOST = "am1shyeyqbxzy8gc.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            process.env.TYPEORM_PORT = "3306",
            process.env.TYPEORM_USERNAME = "xockne52cd09d9im",
            process.env.TYPEORM_PASSWORD = "fd13twc56v4sld3m",
            process.env.TYPEORM_DATABASE  =  "h4hqzs3onggdslcg",
            process.env.TYPEORM_SYNCHRONIZE  = "true",
            process.env.TYPEORM_LOGGING  = "false",
            process.env.TYPEORM_ENTITIES = "lib/DB/entity/*.ts"
        }
        else {
            process.env.TYPEORM_CONNECTION = "mariadb",
            process.env.TYPEORM_HOST = "localhost",
            process.env.TYPEORM_PORT = "3306",
            process.env.TYPEORM_USERNAME = "root",
            process.env.TYPEORM_PASSWORD = "gti525h2019analytics",
            process.env.TYPEORM_DATABASE  =  "analytics",
            process.env.TYPEORM_SYNCHRONIZE  = "true",
            process.env.TYPEORM_LOGGING  = "false",
            process.env.TYPEORM_ENTITIES = "lib/DB/entity/*.ts"
        }
    }

    private config(): void {
        //view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        //Cookie parser
        this.app.use(cookieParser());
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true , limit:'50mb' }));
        //express validator
        this.app.use(expressValidator());
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
        this.app.set('trust proxy', 1) 
        this.app.use(session({
            key: 'user_sid',
            secret: 'thisisasecret',
            resave: false,
            saveUninitialized: true,
            cookie: {
                expires: 6000000
            },
            store: new MongoStore({
                url: 'mongodb://root:gti525h2019analytics@ds135305.mlab.com:35305/heroku_pff57jrg'
              })
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