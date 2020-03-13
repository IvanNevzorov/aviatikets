import api from '../service/apiService';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.short_cities = {};
        this.last_search = {};
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ]);

        const [countries, cities] = response;
        this.countries = this.serialazeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.short_cities = this.createSortCities(this.cities);
        console.log(this.cities);

        return response;
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(item => item.full_name === key);
        return city.code;
    }

    createSortCities(cities) {
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.full_name] = null;
            return acc
        }, {})
    }

    serialazeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc
        }, {});
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const country_name = this.countries[city.country_code].name;
            const city_name = city.name || city.name_translations.en;
            const full_name = `${city_name}, ${country_name}`;

            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            };
            return acc
        }, {});
    }

    async fetchPrices(params) {
        const response = await this.api.prices(params);
        console.log(response);
    }



    // getCitiesByCountryCode(code) {
    //     return [this.cities.filter(item => item.country_code === code)];
    // }


}

const locations = new Locations(api);

export default locations;