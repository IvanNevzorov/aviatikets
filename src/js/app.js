import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency'
import tiketsUI from './views/tikets'

document.addEventListener('DOMContentLoaded', (e) => {
    InitUi();
    const form = formUI.form;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const date_depart = formUI.dataDepartValue;
        const date_return = formUI.dataReturnValue;
        const currency = currencyUI.currencyValue;

        locations.fetchPrices({
            origin,
            destination,
            date_depart,
            date_return,
            currency
        });

        tiketsUI.renderTikets(locations.last_search);
    })

})

async function InitUi() {
    await locations.init();
    formUI.setAutocomliteData(locations.short_cities);
}



