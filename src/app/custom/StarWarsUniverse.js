import Starship from './Starship';
export default class StarWarsUniverse {
    constructor() {
        this.starships = [];
    }
    async init() {
        await this._createStarships();
    }

    async getStarshipCount() {
        const response = await fetch('https://swapi.booost.bg/api/starships/');
        const data = await response.json();
        for (const [key, value] of Object.entries(data)) {
            if (key === 'count') {
                return value;
            }
        }
    }

    async _createStarships() {
        const count = await this.getStarshipCount();
        for (let index = 1; index < count + 1; index++) {
            const response = await fetch(`https://swapi.booost.bg/api/starships/${index}`);
            const info = response.status;
            if (info !== 404) {
                const data = await response.json();
                const isValid = this._validateData(data);
                if (isValid) {
                    const starship = new Starship(data.name, data.consumables, data.passengers);
                    this.starships.push(starship);
                };
            }
        }
    }

    _validateData(data) {
        if (((data.consumables && data.passengers) !== (undefined && null)) && data.consumables !== 'unknown'
            && data.passengers !== '0' && data.passengers !== 'n/a') {
            return true;
        } else {
            return false;
        }
    }

    get theBestStarship() {
        const max = this.starships.reduce((a, b) => a.maxDaysInSpace > b.maxDaysInSpace ? a : b).maxDaysInSpace;
        const element = this.starships.find(({ maxDaysInSpace }) => maxDaysInSpace === max);
        return element;
    }
}