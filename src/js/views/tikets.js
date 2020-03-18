import currencyUI from './currency'
class TiketsUI {
    constructor() {
        this.container = document.querySelector('.tikets .row');
        this.getCurrencySimvol = currencyUI.getCurrencySymvol.bind(currencyUI)
    }

    renderTikets(tikets) {
        this.clearContainer();

        if (!tikets.length) {
            this.showEmptyMsg();
            return;
        }

        let fragment = '';
        const currency = this.getCurrencySimvol();

        tikets.forEach(tiket => {
            const template = TiketsUI.tiketTemplate(tiket, currency);
            fragment += template;
        });

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmptyMsg() {
        const taplate = TiketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', taplate);
    }

    static tiketTemplate(tiket, currency) {
        return `
        <div class="col s12 m6">
            <div class="card ticket-card">
              <div class="ticket-airline d-flex align-items-center">
                <img
                  src=${tiket.airline_logo}
                  class="ticket-airline-img"
                />
                <span class="ticket-airline-name"
                  >${tiket.airline_name}</span
                >
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${tiket.origin_name} </span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${tiket.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${tiket.date_return}</span>
                <span class="ticket-price ml-auto">${currency} ${tiket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: 1</span>
                <span class="ticket-flight-number">Номер рейса: 26</span>
              </div>
            </div>
          </div>
        `
    }

    static emptyMsgTemplate() {
        return `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено.
        </div>
        `;
    }
}

const tiketsUI = new TiketsUI();

export default tiketsUI;