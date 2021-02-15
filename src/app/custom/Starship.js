export default class Starship {
    constructor(name, consumables, passengers) {
        this.name = name;
        this.consumables = consumables;
        this.passengers = passengers;
    }

    set consumables(consumables) {
        const splitedData = consumables.split(' ');
        let multiply = 1;
        switch (splitedData[1]) {
            case 'years':
            case 'year':
                multiply = 365;
                break;
            case 'months':
            case 'month':
                multiply = 30;
                break;
            case 'weeks':
                multiply = 7;
                break;
            default:
                multiply = 1;
                break;
        }
        this._consumables = multiply * parseInt(splitedData[0]);
    }

    set passengers(passengers) {
        this._passengers = parseInt(passengers);
    }

    get maxDaysInSpace() {
        return this._consumables / this._passengers;
    }
}