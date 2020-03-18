import api from '../service/apiService';
import { formatDate } from '../helpers/date';

class Locations {
    constructor(api, helper) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.short_cities = {};
        this.last_search = {};
        this.airlines = {};
        this.formatDate = helper.formatDate
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines()
        ]);

        const [countries, cities, airlines] = response;
        this.countries = this.serialazeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.short_cities = this.createSortCities(this.cities);
        this.airlines = this.serialazeAirlines(airlines);

        return response;
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(item => item.full_name === key);
        return city.code;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
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

    serialazeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.name = airline.name || airline.name_translations.en;
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`
            acc[airline.code] = airline;
            return acc;
        }, {})
    }

    serialazeTikets(tikets) {
        return Object.values(tikets).map(tiket => {
            return {
                ...tiket,
                airline_name: this.getAirlineNameByCode(tiket.airline),
                airline_logo: this.getAirlineLogoByCode(tiket.airline),
                origin_name: this.getCityNameByCode(tiket.origin),
                destination_name: this.getCityNameByCode(tiket.destination),
                date_origin: this.formatDate(tiket.departure_at, 'dd MMM yyyy hh:mm'),
                date_return: this.formatDate(tiket.return_at, 'dd MMM yyyy hh:mm'),
            }
        })
    }


    async fetchPrices(params) {
        const response = await this.api.prices(params);
        this.last_search = this.serialazeTikets(response.data);
        console.log(this.last_search);
    }
}

const locations = new Locations(api, { formatDate });

export default locations;