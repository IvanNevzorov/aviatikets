import { getAutocompleteInstance, getDatepikerInstance } from '../plugins/materialize'

class FormUI {
    constructor(autocomplateInstance, datepikerInstance) {
        this._form = document.querySelector('.card-order');
        this.origin = document.getElementById('input-origin');
        this.originAutocomplite = autocomplateInstance(this.origin);
        this.destination = document.getElementById('input-destination');
        this.destinationAutocomplite = autocomplateInstance(this.destination);
        this.data_depart = datepikerInstance(document.getElementById('input-date-depart'));
        this.data_return = datepikerInstance(document.getElementById('input-date-return'));
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get dataDepartValue() {
        return this.data_depart.toString();
    }

    get dataReturnValue() {
        return this.data_return.toString();
    }

    setAutocomliteData(data) {
        this.originAutocomplite.updateData(data);
        this.destinationAutocomplite.updateData(data);
    }

}

const formUI = new FormUI(getAutocompleteInstance, getDatepikerInstance);

export default formUI;