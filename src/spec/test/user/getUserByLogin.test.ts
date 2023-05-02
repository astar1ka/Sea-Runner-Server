import md5 from "md5";
import DB from "../../../application/modules/DB/DB";
import { TUser } from "../../../application/modules/Types";
import CONFIG from "../../../config";
import {expect, describe, test} from '@jest/globals';

const initCb = () => {
    
}

describe('getUserByLogin', () => {
    test('return a user with given login', async () => {
        const { DB_CONNECT } = new CONFIG;
        const db = new DB({...DB_CONNECT, initCb});
        const user = await db.getUserByLogin('vasya');
        expect(user).toEqual({login: 'vasya'});
    })
})

