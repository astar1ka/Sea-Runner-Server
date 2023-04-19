import { Database, Statement } from "sqlite3";

export default class SQLQuery{
    constructor(readonly db: Database, private query: string = '', private values: any [] = []){
    }

    conditions(conditions: object, operand: string = 'AND'): SQLQuery{
        const params = Object.keys(conditions).map(key => ` ${key}=? `).join(operand);
        const values = Object.values(conditions);
        this.query = `${this.query} WHERE ${params}`;
        this.values = [...this.values,...values];
        return this;
    }

    limit(value:number): SQLQuery{
        this.query = `${this.query} LIMIT ${value}`;
        this.values.push(value);
        return this;
    }

    offset(value:number): SQLQuery{
        this.query = `${this.query} OFFSET ${value}`;
        this.values.push(value);
        return this;
    }

    orderBy(field:string): SQLQuery{
        this.query = `${this.query} ORDER BY ${field}`;
        this.values.push(field);
        return this;
    }

    all<T>(){
        return new Promise<T>((resolve) => {
            this.db.all(this.query,this.values,
                (error: Error, rows: any) => resolve(error ? [] : rows))
        });
    }

    get<T>(){
        return new Promise<T | null>((resolve) => {
            this.db.get(this.query,this.values,
                (error: Error, row: any) => resolve(error ? null : row))
        });
    }

    run(){
        return new Promise<boolean>((resolve) => {
            this.db.run(this.query,this.values,
                (error: Error) => resolve(!error))
        });
    }


}