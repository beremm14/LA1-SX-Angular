"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Value {
    constructor(tempCelsius, powerWatt) {
        this.time = new Date();
        this.temp = tempCelsius;
        this.tempUnit = '°C';
        this.power = powerWatt;
        this.powerUnit = 'W';
    }
}
exports.Value = Value;

//# sourceMappingURL=value.js.map
