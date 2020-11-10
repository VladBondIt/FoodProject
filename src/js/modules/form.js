import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо!Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
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

            // Новый стандарт приеобразования FormData в JSON

            // const json = JSON.stringify(Object.fromEntries(FormData.entries()));

            const json = JSON.stringify(obj);

            // Fetch POST через FormData
            // Promise который запускается при помощи fetch`a не перейдет в состаяние
            // отклонено-rejected из-за ответа HTTP протокола который считается ошибкой,
            // он всеравно выполнится нормально меняется только свойство status 
            // которое перейдет в значение false, reject будет возницать,
            // только при сбое сети или падении сервера.
            // fetch('server.php', {
            //     method: "POST",
            // headers: {
            //     'Content-type': 'application/json'
            // },
            // Отправляем данные в формате FormData
            // body: formData
            // Отправляем данные в формате JSON
            // body: JSON.stringify(obj)
            // Data данные которые вернет сервер после поста
            // преобразовываем ответ в текст методом фетча
            // })
            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 3000);
    }

}

export default form;