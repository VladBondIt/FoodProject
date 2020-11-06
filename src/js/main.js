'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // !!!!TABS!!!!

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabcontainer');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('active');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('active');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.matches('.tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // !!! TIMER !!!!!


    const deadline = '2020-11-11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const returnedObj = getTimeRemaining(endtime);

            days.innerHTML = getZero(returnedObj.days);
            hours.innerHTML = getZero(returnedObj.hours);
            minutes.innerHTML = getZero(returnedObj.minutes);
            seconds.innerHTML = getZero(returnedObj.seconds);

            if (returnedObj.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //  MODAL !!!

    const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector(".modal"),
        modalCloseBtn = document.querySelector('[data-close]');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // clearInterval(modalTimerId);
    }

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });



    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.matches('.active')) {
            closeModal();
            // console.log('object');
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (Math.ceil(window.pageYOffset) + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // ITEMS OBJECT

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            this.classes.forEach(className => element.classList.add(className));
            if (!element.matches('menu__item')) {
                element.classList.add('menu__item');
            }
            element.innerHTML += `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        `"img/tabs/vegy.jpg"`,
        `"vegy"`,
        `Меню "Фитнес"`,
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
        овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
        ценой и высоким качеством!`,
        9,
        '.menu__field .container',
        'big'
    ).render();

    new MenuCard(
        `"img/tabs/elite.jpg"`,
        `"elite"`,
        `Меню “Премиум”`,
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
        и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
        в ресторан!`,
        14,
        '.menu__field .container',
        'menu__item'
    ).render();

    new MenuCard(
        `"img/tabs/post.jpg"`,
        `"post"`,
        `Меню "Постное"`,
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
        количество белков за счет тофу и импортных вегетарианских стейков. `,
        21,
        '.menu__field .container',
        'menu__item'
    ).render();

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо!Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;

            form.append(statusMessage);

            const r = new XMLHttpRequest();
            r.open('POST', 'server.php');
            //При использовании XMLHttpRequest и FormData Заголовок устанавливать ненадо
            // r.setRequestHeader('Content-type', 'multipart/form-data');
            // Для JSON формата
            r.setRequestHeader('Content-type', 'application/json');

            // FormData создает данные формата key:value
            // Нужно всегда проверять атрибут name у инпутов, без нейма работать не будет.
            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function (key, value) {
                obj[key] = value;
            })

            const json = JSON.stringify(obj)

            // r.send(formData);
            // Формат JSON
            r.send(json);

            r.addEventListener('load', () => {
                if (r.status === 200) {
                    console.log(r.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });


        });
    }

});