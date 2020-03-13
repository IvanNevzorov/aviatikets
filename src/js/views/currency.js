import { getSelecteInstance } from '../plugins/materialize';

class CurrencyUI {
    constructor(selectInstance) {
        this.currency = document.getElementById('select-currency');
    }

    get currencyValue() {
        console.log(this.currency);
        return this.currency.value;
    }
}

const currencyUI = new CurrencyUI(getSelecteInstance);

export default currencyUI;