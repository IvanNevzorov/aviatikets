import { getSelecteInstance } from '../plugins/materialize';

class CurrencyUI {
    constructor(selectInstance) {
        this.currency = document.getElementById('select-currency');
        this.draft = {
            USD: '$',
            EUR: '€'
        }
    }

    get currencyValue() {
        return this.currency.value;
    }

    getCurrencySymvol() {
        const currency = this.currencyValue;
        return this.draft[currency];
    }
}

const currencyUI = new CurrencyUI(getSelecteInstance);

export default currencyUI;