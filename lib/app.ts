import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as https from 'https';
import * as fs from 'fs';
import * as cors from 'cors';
const PORT = 3000;

const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')

}
class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    constructor() {
        createConnection().then(async connection => {
            try {
                this.app = express();
                this.app.set('notready', true); 
                this.app.use(cors());
                this.config();
                this.routePrv.routes(this.app);
                https.createServer(httpsOptions, this.app).listen(PORT, () => {
                    console.log('Express server listening on port ' + PORT);
                    if (process.env.NODE_ENV === 'test'){
                        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
                    }
                })
            }
            catch (e) { console.log("ERROR ON START", e) }
        }).catch(error => console.log("TypeORM connection error: ", error));
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        process.on('uncaughtException', (err) => {
            console.log('uncaughtException in app.ts', err);
        });
        process.on('unhandledRejection', (err) => {
            console.log('unhandledRejection in app.ts', err);
        });
    }
}

export default new App().app;