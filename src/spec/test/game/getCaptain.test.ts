import Captain from "../../../application/modules/GameManager/Game/Entite/Captain";
import DB from "../../../application/modules/DB/DB";
import { beforeAllConfigCaptain } from "../user/config";

let captain: Captain;
let db: DB;

beforeAll(async () => {
  captain = await beforeAllConfigCaptain();
});

describe('Captain', () => {
//   test('добавляет капитана', () => {
//     const data = {userId: 2, allianceId: 2, shipId: null, x: 2.3553, y: 4.4353};
//     const result = captain.addCaptain(data);
//     expect(result).toEqual(false);
//   });
    // describe('getCaptain', () => {
    //     test("Возвращает капитана из метода getCaptain в DB", async () => {
    //         const userId = 1;
    //         const result = await this.db.getCaptain(userId);
    //         expect(result).toEqual(true);
    //     })
    // })

    describe('getByUserId', () => {
        test('возвращает true при наличии капитана c заданным userId', async () => {
            const userId = 1;      
            const result = await captain.getByUserId(userId);
            expect(result).toEqual(true);
        });
    
        test('возвращает false при отсутствии капитана c заданным, фейковым userId', async () => {
            const userId = 1242;      
            const result = await captain.getByUserId(userId);
            expect(result).toEqual(false);
        });
    });
});
