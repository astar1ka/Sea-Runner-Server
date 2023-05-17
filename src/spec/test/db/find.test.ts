import DB from "../../../application/modules/DB/DB";
import { Tables } from "../../../application/modules/Types";
import CONFIG from "../../../config";

const initCb = () => {}

describe('find', () => {

    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });

    test('find', async () => {
        const usersId = await db.getIds(Tables.users);
        const countId = (Array.isArray(usersId))? usersId.length : 0;
        const randomId = Math.floor(Math.random()*countId)+1;
        let tables = await db.find(Tables.users, randomId);
        expect(tables).not.toBeNull();
        expect(tables).toHaveProperty('login');
    });
});