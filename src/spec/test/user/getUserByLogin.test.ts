<<<<<<< Updated upstream
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

=======
import DB from "../../../application/modules/DB/DB";
import User from "../../../application/modules/UserManager/User";
import { regUser, beforeAllConfig } from "./config";

let user: User;
let db: DB; 

beforeAll(async () => {
  user = await beforeAllConfig();
  db = user.db; 
});

describe('getUserByLogin', () => {
    const loginDB = 'vasya';
    const {login}  = regUser;

  test('возвращает пользователя с заданным логином', async () => {
    const returnedUser = await db.getUserByLogin(loginDB);
    expect(returnedUser).toStrictEqual({id: "2", login: "vasya", name: "Vasya Pupkin", password: "123", token: null});
  });

  test('не возращает пользователя с заданным логином, его нет', async () => {
    const returnedUser = await db.getUserByLogin(login);
    expect(returnedUser).toBe(null);
  });
});
>>>>>>> Stashed changes
