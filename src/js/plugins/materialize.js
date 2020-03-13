import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

//init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelecteInstance(elem) {
    M.FormSelect.getInstance(elem);
}


//itit autocomplete
const autocomplite = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplite, {
    data: {}
});

export function getAutocompleteInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

//itit datepiker
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
    showClearBtn: true,
    format: 'yyyy-mm'
});

export function getDatepikerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}
