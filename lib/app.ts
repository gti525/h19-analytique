import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as https from 'https';
import * as fs from 'fs';
const PORT = 3000;

const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')

}
class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    //TODO export routes to configs
    constructor() {
        createConnection().then(async connection => {
            try {
                this.app = express();
                this.app.set('notready', true); 
                this.config();
                this.routePrv.routes(this.app);
                https.createServer(httpsOptions, this.app).listen(PORT, () => {
                    console.log('Express server listening on port ' + PORT);
                    console.log(process.env.NODE_ENV)
                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
            console.log('uncaughtException', err);
        });
        process.on('unhandledRejection', (err) => {
            console.log('unhandledRejection', err);
        });
    }
}

export default new App().app;