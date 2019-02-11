import { UserRepo } from "../DB/repo/user.repo";
import { ClientRepo } from "../DB/repo/client.repo";
import { Client } from "../DB/entity/client.entity";
import { User } from "../DB/entity/user.entitiy";
import { TokenService } from "./token.service";
import { BannerId, BannerSize } from "../models/enums/banner-id-enum";
var sha1 = require('sha1');

export class AdvertismentService {
 
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    public getBanner(clientId,bannerId,userId): any {
        // TODO aller cherhcer les images dans la bd.
        // Ajouter une view au user
        // Ajouter la gestion du click
        const response: any = {};
        response.bannerId = bannerId;
        response.url = "https://ici.radio-canada.ca/premiere/emissions/desautels-le-dimanche";
        // Todo aller cherhcer cette image dans la bd
        response.img = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        response.size = this.getBannerSize(bannerId);
        return response;
    }

    private getBannerSize(bannerId): any{
        const size: any = {};
        switch (bannerId){
            case BannerId.vertical:
                size.height =  BannerSize.verticalHeight;
                size.width =  BannerSize.verticalWidth;
                break;
            case BannerId.horizontal:
                size.height =  BannerSize.horizontalHeight;
                size.width =  BannerSize.horizontalWidth;
                break;
            case BannerId.mobile:
                size.height =  BannerSize.mobileHeight;
                size.width =  BannerSize.mobileWidth;
                break;
        }
        return size;
    }

}