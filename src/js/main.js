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
        modal = document.querySelector(".modal");

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        // clearInterval(modalTimerId);
    }

    function openModal() {
        // modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });


    // Проделигировали событие на ново-созданный дочерний крестик.
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModal();
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
        овощей и фруктов. Продукт активных и здоровых людей. 
        Это абсолютно новый продукт с оптимальной
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
        и качественное исполнение блюд. Красная рыба,
         морепродукты, фрукты - ресторанное меню без похода
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
        продуктов животного происхождения, молоко из миндаля,
         овса, кокоса или гречки, правильное
        количество белков за счет тофу и импортных вегетарианских стейков. `,
        21,
        '.menu__field .container',
        'menu__item'
    ).render();

    // AJAX

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо!Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // FormData создает данные формата key:value
            // Нужно всегда проверять атрибут name у инпутов, без нейма работать не будет.
            // Трансформацяи FormData в JSON формат.
            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function (key, value) {
                obj[key] = value;
            });

            // const json = JSON.stringify(obj);

            // Fetch POST через FormData
            // Promise который запускается при помощи fetch`a не перейдет в состаяние
            // отклонено-rejected из-за ответа HTTP протокола который считается ошибкой,
            // он всеравно выполнится нормально меняется только свойство status 
            // которое перейдет в значение false, reject будет возницать,
            // только при сбое сети или падении сервера.
            fetch('server.php', {
                method: "POST",
                // headers: {
                //     'Content-type': 'application/json'
                // },
                // Отправляем данные в формате FormData
                // body: formData
                // Отправляем данные в формате JSON
                body: JSON.stringify(obj)
                // Data данные которые вернет сервер после поста
                // преобразовываем ответ в текст методом фетча
            }).then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                    form.reset();
                });
            // .finally(() => {
            //     form.reset();
            // });
        });
    }

    function showThanksModal(message) {
        const previusModalDialog = document.querySelector('.modal__dialog');

        previusModalDialog.classList.add('hide');
        openModal();

        const thaksModal = document.createElement('div');
        thaksModal.classList.add('modal__dialog');
        thaksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thaksModal);
        setTimeout(() => {
            thaksModal.remove();
            // previusModalDialog.classList.add('show');
            previusModalDialog.classList.remove('hide');
            closeModal();
        }, 3000);
    }

});