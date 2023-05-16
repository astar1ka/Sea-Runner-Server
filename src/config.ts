type TNameArray = {
    [key: string]:string
};

export default class CONFIG{
    public PORT:number = 3001;

    DB_CONNECT = {

        HOST: 'localhost',
<<<<<<< Updated upstream
        PORT: 5433,
        NAME: 'SeaRunner.db',
        USER: 'postgres',
        PASS: '111'
=======
        PORT: 5432,
        NAME: 'SeaRunner',
        USER: 'm3rcy',
        PASS: '1337'
>>>>>>> Stashed changes
    }

    public MESSAGES: TNameArray = {
        SEND_MESSAGE: 'SEND_MESSAGE',
        GET_MESSAGES_ALL: 'GET_MESSAGES_ALL',
        GET_MESSAGES_PRIVATE: 'GET_MESSAGES_PRIVATE',
        LOG_IN: 'LOG_IN',
        REGISTRATION: 'REGISTRATION',
        LOG_OUT: 'LOG_OUT',
        GAME_LOADED: 'GAME_LOADED'
    }

    public MEDIATOR:{
        [key: string]: TNameArray
    } = {
        EVENTS:{
            CHANGE_USERS:'CHANGE_USERS',
            CHANGE_USER:'CHANGE_USER',
            USER_LOG_IN: 'USER_LOG_IN',
            USER_LOADED: 'USER_LOADED'
        },
        TRIGGERS:{
            GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
            GET_USER: 'GET_USER',
            LOG_IN: 'LOG_IN',
            LOG_OUT: 'LOG_OUT',
            REGISTRATION: 'REGISTRATION',
            GET_ALL_USERS: 'GET_ALL_USERS',
            GET_MESSAGES:'GET_MESSAGES', 
            GET_CHAT_HASH:'GET_CHAT_HASH', 
            ADD_MESSAGE: 'ADD_MESSAGE',
            SEND_ALL: 'SEND_ALL'
        }
    }
}