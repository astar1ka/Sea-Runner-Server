import User from "../../../application/modules/UserManager/User";
import { beforeAllConfig, regUser } from "./config";
let user: User;

beforeAll(async () => user = await beforeAllConfig());


describe('User.auth', () => {
    const {login, password, socketId } = regUser;

    test('Неправильный пароль', async () => {
        const result = await user.auth(login, password, socketId);
        expect(result).toEqual(false);
    });

    test('Попытка входа c существующим', async () => {
        const result = await user.auth('vasya', '123', socketId);
        expect(result).toEqual(true);
    });

    test('Попытка входа', async () => {
        const result = await user.auth(login, password, socketId);
        expect(result).toEqual(false);

        const data = user.getData()
        expect(data.token).not.toBeNull();
    });
})