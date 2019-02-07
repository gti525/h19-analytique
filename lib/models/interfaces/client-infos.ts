import { Client } from "../../DB/entity/client.entity";
import * as _ from 'lodash';

var sha1 = require('sha1');

export class ClientInfo {
    public url? : string;
    public completeUrl? : string;
    public uniqueHash? : string;

    // Used for hash
    public screenWidth? : number;
    public screenHeight? : number;
    public screenColorDepth? : number;
    public plugins? : string[];
    public languages? : string[];
    public hash? : string;
    public browser? : string;
    public doNotTrack? : boolean;
    public os? : string;
    public graphicCard? : string;
    public canvasHash: string;
    public longitude?: string;
    public latitude?: string;
    
    public generateHash(){
        const concat = this.graphicCard + this.languages + this.os + this.plugins + this.screenColorDepth + this.screenHeight 
        + this.screenWidth +  this.browser + this.browser + this.doNotTrack + this.canvasHash + this.longitude + this.latitude;
        this.hash = sha1(concat);
    }

    public generateClientEntity(): Client{
        const client = new Client();
        _.merge(client,this);
        client.resolution = `${this.screenWidth}X${this.screenHeight}X${this.screenColorDepth}`;
        client.date = new Date();
        client.identifier = this.hash;
        return client;
    }
}