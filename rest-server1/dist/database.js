"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_1 = require("./value");
class Database {
    constructor() {
        this.data = [];
        this.add(new value_1.Value(23.4, 100));
        this.add(new value_1.Value(23.5, 120));
        this.add(new value_1.Value(23.6, 150));
        this.add(new value_1.Value(23.7, 200));
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
    size() {
        return this.data.length;
    }
    get(index) {
        return this.data[index];
    }
    getPower(index) {
        return this.data[index].power;
    }
    getTemp(index) {
        return this.data[index].temp;
    }
    add(value) {
        this.data.push(value);
    }
    edit(index, temp, power) {
        if (typeof temp === 'number' && typeof power === 'number') {
            this.data[index] = new value_1.Value(temp, power);
        }
        else if (typeof temp === 'number' && typeof power === 'undefined') {
            this.data[index] = new value_1.Value(temp, this.getPower(index));
        }
        else if (typeof power === 'number' && typeof temp === 'undefined') {
            this.data[index] = new value_1.Value(this.getTemp(index), power);
        }
    }
    remove(index) {
        this.data.splice(index, 1);
    }
    getAll() {
        return [].concat(this.data);
    }
}
exports.Database = Database;

//# sourceMappingURL=database.js.map
