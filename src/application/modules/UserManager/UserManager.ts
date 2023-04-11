import Cache from "../Cache";
import Manager, { IManager } from "../Manager";
import { IUser, IUserData, ILogin } from "../Types";
import User from "./User";
import md5 from 'md5';

export default class UserManager extends Manager {
    private cacheUsersById = new Cache<User>;
    private cacheUsersByLogin = new Cache<User>;
    constructor(options: IManager) {
        super(options);
        const messages: any [] = [];
        //io
        if (!this.io) return;
        this.io.on('connection', (socket: any) => {
            socket.on(this.MESSAGES.REGISTRATION, (data: IUserData) => {
                const result = this.registration(data);
                socket.emit(this.MESSAGES.REGISTRATION, result);
            });
            socket.on(this.MESSAGES.LOG_IN, (data:ILogin) => {
                const UserData = this.login(data);
                if (UserData) socket.user = this.getUser(UserData.id);
                socket.emit(this.MESSAGES.LOG_IN, UserData);
            });
            socket.on(this.MESSAGES.LOG_OUT, (token: string) => {
                if (socket.user){
                    (this.logout(socket.user, token)) ? socket.emit(this.MESSAGES.LOG_OUT) : socket.emit(this.MESSAGES.LOG_OUT_ERROR);
                }
            });
            socket.on('disconnect', () => {
                if (socket.user) socket.user.logout();
            });
        });

        //Mediator Triggers
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION, GET_ALL_USERS } = this.TRIGGERS;
        this.mediator.set(GET_USER, (id: number) => this.getUser(id));
        this.mediator.set(LOG_IN, (data: ILogin) => this.login(data));
        this.mediator.set(REGISTRATION, (data: IUserData) => this.registration(data));
        this.mediator.set(GET_ALL_USERS, () => this.getAllUsers());
        //Mediator Events
        const { CHANGE_USERS, CHANGE_USER } = this.EVENTS;
        this.mediator.subscribe(CHANGE_USERS, () => this.loadAllUserFromDB());
        this.mediator.subscribe(CHANGE_USER, (id: number) => this.updateUserData(id));

        this.loadAllUserFromDB();
    }

    public getUser(id: number): User | null {
        return this.cacheUsersById.get(id) || null;
    }

    private getUserByLogin(login: string): User | null {
        return this.cacheUsersByLogin.get(login) || null;;
    }

    private updateCaches(user: IUser) {
        const cacheUser = new User(user);
        this.cacheUsersById.set(user.id, cacheUser);
        this.cacheUsersByLogin.set(user.login,cacheUser);
    }

    public async updateUserData(id: number) {
        const user = await this.db.getUser(id);
        if (user) this.updateCaches(user);
    }

    private async loadAllUserFromDB() {
        let allUsers = await this.db.getAllUsers();
        if (allUsers) {
            allUsers.forEach((user) => this.updateCaches(user))
        }
    }

    public async registration(data: IUserData) {
        if (await this.db.addUser(data)) {
            this.loadAllUserFromDB()
            return true;
        };
        return false;
    }

    public login(data: ILogin) {
        const { login, password } = data;
        const user = this.getUserByLogin(login);
        if (user) {
            const data = user.auth(password);
            if (data) {
                this.db.setUserToken(user.id, data.token);
            }
            return data;
        }
        return false;
    }

    public logout(user: User, token: string): boolean {
            if (user.verification(token)) {
                if (user.logout()) {
                    this.db.setUserToken(user.id, null);
                }
                return true;
            }
        return false;
    }

    public getAllUsers() {
        return Object.values(this.cacheUsersById).map(user => user.get());
    }
}

