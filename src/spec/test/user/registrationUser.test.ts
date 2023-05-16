import User from "../../../application/modules/UserManager/User";
import { regUser, beforeAllConfig } from "./config";

let user: User;

beforeAll(async () => user = await beforeAllConfig());

describe('User.registration', () => {
    const { login, password, name, socketId } = regUser;

    test('Регистрируем рандомного пользователя', async () => {
        const result = await user.registration(login, password, name);
        expect(result).toEqual(true);
    });

    test('Повторная регистрация', async () => {
        const result = await user.registration(login, password, name);
        expect(result).toEqual(false);
    });

    test('Попытка входа', async () => {
        const result = await user.auth(login, password, socketId);
        expect(result).toEqual(true);
    });
})