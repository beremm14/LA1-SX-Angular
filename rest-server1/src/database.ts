import { Value } from './value';

export class Database {

    public static getInstance (): Database {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }

    // Feld (in Js) ist Array-List (in Java)
    // Objekt (in JS) ist HashMap (in Java)

    private static instance: Database;

    private data: Value[] = [];

    private constructor () {
        this.add(new Value(23.4, 100));
        this.add(new Value(23.5, 120));
        this.add(new Value(23.6, 150));
        this.add(new Value(23.7, 200));
    }

    public size (): number {
        return this.data.length;
    }

    public get (index: number): Value {
        return this.data[index];
    }

    public getPower (index: number): number {
        return this.data[index].power;
    }

    public getTemp (index: number): number {
        return this.data[index].temp;
    }

    public add (value: Value) {
        this.data.push(value);
    }

    // Signature Overloading TS
    // public edit (index: number, value: Value): void;
    // public edit (index: number, temp: number, power: number): void;
    public edit (index: number, temp: any, power: any): void {
        if (typeof temp === 'number' && typeof power === 'number') {
            this.data[index] = new Value(temp, power);
        } else if (typeof temp === 'number' && typeof power === 'undefined') {
            this.data[index] = new Value(temp, this.getPower(index));
        } else if (typeof power === 'number' && typeof temp === 'undefined') {
            this.data[index] = new Value(this.getTemp(index), power);
        }
    }

    public remove (index: number) {
        this.data.splice(index, 1);
    }

    // Neues Feld mit dem Inhalt des alten Feldes
    public getAll (): Value [] {
        return [].concat(this.data);
    }


}
