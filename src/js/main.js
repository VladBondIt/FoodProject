'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import form from './modules/form';
import slider from './modules/slider';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);
    tabs();
    modal('[data-modal]', '.modal', modalTimerId);
    timer();
    cards();
    calculator();
    form(modalTimerId);
    slider();

});