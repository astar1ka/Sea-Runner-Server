import ActiveRecord from "../../../ActiveRecord";
import Cache from "../../../Cache";
import DB from "../../../DB/DB";
import { ICaptain, IShip, Tables } from "../../../Types";

export default class Captain extends ActiveRecord{
    constructor(db: DB){
        super(db, Tables.captains);
        this.fields = ['id', 'userid', 'allianceid', 'shipid', 'x', 'y'];
    }

    public addCaptain(data: any){
        return this.create(data);
    }

    public addShip(ship: IShip):void {
        //this.ships.set(ship.id,new Ship(ship));
    }

    public async getByUserId(userId: number): Promise<boolean>{
        const data = await this.db.getCaptain(userId);
        if (data) {
            this.reload(data);
            return true;
        }
        else return false;
    }
}