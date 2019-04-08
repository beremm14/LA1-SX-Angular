
export class Value {

    time: Date;
    temp: number;
    power: number;
    powerUnit: String;
    tempUnit: String;

    constructor (tempCelsius: number, powerWatt: number) {
        this.time = new Date();
        this.temp = tempCelsius;
        this.tempUnit = '°C';
        this.power = powerWatt;
        this.powerUnit = 'W';
    }

}
